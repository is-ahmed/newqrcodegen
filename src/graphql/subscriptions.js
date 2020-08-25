/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCheckin = /* GraphQL */ `
  subscription OnCreateCheckin($owner: String!) {
    onCreateCheckin(owner: $owner) {
      id
      firstName
      lastName
      email
      phone
      propertyID
      propertyAddress
      notes
      createdAt
      star
      owner
      answers
      updatedAt
    }
  }
`;
export const onUpdateCheckin = /* GraphQL */ `
  subscription OnUpdateCheckin($owner: String!) {
    onUpdateCheckin(owner: $owner) {
      id
      firstName
      lastName
      email
      phone
      propertyID
      propertyAddress
      notes
      createdAt
      star
      owner
      answers
      updatedAt
    }
  }
`;
export const onDeleteCheckin = /* GraphQL */ `
  subscription OnDeleteCheckin($owner: String!) {
    onDeleteCheckin(owner: $owner) {
      id
      firstName
      lastName
      email
      phone
      propertyID
      propertyAddress
      notes
      createdAt
      star
      owner
      answers
      updatedAt
    }
  }
`;
export const onCreateProperty = /* GraphQL */ `
  subscription OnCreateProperty($owner: String!) {
    onCreateProperty(owner: $owner) {
      id
      address
      scanText
      picture0
      picture1
      sign
      createdAt
      owner
      questions
      title
      inputText
      updatedAt
    }
  }
`;
export const onUpdateProperty = /* GraphQL */ `
  subscription OnUpdateProperty($owner: String!) {
    onUpdateProperty(owner: $owner) {
      id
      address
      scanText
      picture0
      picture1
      sign
      createdAt
      owner
      questions
      title
      inputText
      updatedAt
    }
  }
`;
export const onDeleteProperty = /* GraphQL */ `
  subscription OnDeleteProperty($owner: String!) {
    onDeleteProperty(owner: $owner) {
      id
      address
      scanText
      picture0
      picture1
      sign
      createdAt
      owner
      questions
      title
      inputText
      updatedAt
    }
  }
`;
