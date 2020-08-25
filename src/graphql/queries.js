/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCheckin = /* GraphQL */ `
  query GetCheckin($id: ID!) {
    getCheckin(id: $id) {
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
      updatedAt
    }
  }
`;
export const listCheckins = /* GraphQL */ `
  query ListCheckins(
    $filter: ModelCheckinFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCheckins(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProperty = /* GraphQL */ `
  query GetProperty($id: ID!) {
    getProperty(id: $id) {
      id
      address
      scanText
      picture0
      picture1
      sign
      createdAt
      owner
      questions
      updatedAt
    }
  }
`;
export const listPropertys = /* GraphQL */ `
  query ListPropertys(
    $filter: ModelPropertyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPropertys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        address
        scanText
        picture0
        picture1
        sign
        createdAt
        owner
        questions
        updatedAt
      }
      nextToken
    }
  }
`;
