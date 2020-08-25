/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateCheckin = /* GraphQL */ `
  mutation UpdateCheckin(
    $input: UpdateCheckinInput!
    $condition: ModelCheckinConditionInput
  ) {
    updateCheckin(input: $input, condition: $condition) {
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
export const deleteCheckin = /* GraphQL */ `
  mutation DeleteCheckin(
    $input: DeleteCheckinInput!
    $condition: ModelCheckinConditionInput
  ) {
    deleteCheckin(input: $input, condition: $condition) {
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
export const createProperty = /* GraphQL */ `
  mutation CreateProperty(
    $input: CreatePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    createProperty(input: $input, condition: $condition) {
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
export const updateProperty = /* GraphQL */ `
  mutation UpdateProperty(
    $input: UpdatePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    updateProperty(input: $input, condition: $condition) {
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
export const deleteProperty = /* GraphQL */ `
  mutation DeleteProperty(
    $input: DeletePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    deleteProperty(input: $input, condition: $condition) {
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
export const createCheckin = /* GraphQL */ `
  mutation CreateCheckin(
    $input: CreateCheckinInput!
    $condition: ModelCheckinConditionInput
  ) {
    createCheckin(input: $input, condition: $condition) {
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
