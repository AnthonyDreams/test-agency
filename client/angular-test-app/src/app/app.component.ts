import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {find, forEach} from 'lodash';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit{
  mutation_name = "";

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
        query IntrospectionQuery {
          __schema {
            queryType { name }
            mutationType { name }
            subscriptionType { name }
            types {
              ...FullType
            }
            directives {
              name
              description
              locations
              args {
                ...InputValue
              }
            }
          }
        }
      
        fragment FullType on __Type {
          kind
          name
          description
          fields(includeDeprecated: true) {
            name
            description
            args {
              ...InputValue
            }
            type {
              ...TypeRef
            }
            isDeprecated
            deprecationReason
          }
          inputFields {
            ...InputValue
          }
          interfaces {
            ...TypeRef
          }
          enumValues(includeDeprecated: true) {
            name
            description
            isDeprecated
            deprecationReason
          }
          possibleTypes {
            ...TypeRef
          }
        }
      
        fragment InputValue on __InputValue {
          name
          description
          type { ...TypeRef }
          defaultValue
        }
      
        fragment TypeRef on __Type {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                    ofType {
                      kind
                      name
                      ofType {
                        kind
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      
        
        `,
      })
      .valueChanges.subscribe(async result => {
        console.log(result)
        this.mutation_name = find(result.data.__schema.types, (schema) => {
          return schema.name === 'Mutation';

        }).fields[0].name;

        var schema = await find(result.data.__schema.types, (schema) => {
          return schema.kind === 'INPUT_OBJECT';

        });
        await this.formModel(schema);


        await this.formModelConfig(schema);
      });
  }
  orderForm = new FormGroup({});

  // our model:
  order : {} = {};

  // our field configuration. Keys should match our model:
  orderFields: FormlyFieldConfig[] = [];
  option : FormlyFormOptions = {}

  onSubmit(orderInfo) {
    const data = {data: orderInfo}
    console.log( )
    const mutation_query = gql`
      mutation ${this.mutation_name}($data: inputProduct!) {
        ${this.mutation_name}(data: $data) {
          name
        }
      }
    `;

    this.apollo.mutate({
      mutation: mutation_query,
      variables: {
        data: orderInfo
      }
    }).subscribe(result => {
      this.option.resetModel
      console.log(result)
    });
  }


  formModel(schema: {}){
    forEach(schema.inputFields, (obj) =>{
      this.order[obj.name] = "";
    })


  }

  async formModelConfig(schema_type){
    let list = new Array();
    await forEach(schema_type.inputFields, (obj) => {
      list.push({
        key: obj.name, 
        type:"input", 
        templateOptions:
        {
          type:(obj.type.ofType.name =='String' ? 'text': 'number'), 
          label:`${obj.name}`, 
          Placeholder:"", 
          required:true}});
      
    })
    this.orderFields = list;
  }
}

