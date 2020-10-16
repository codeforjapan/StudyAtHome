/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSchool = /* GraphQL */ `
  subscription OnCreateSchool($owner: String!) {
    onCreateSchool(owner: $owner) {
      id
      name
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSchool = /* GraphQL */ `
  subscription OnUpdateSchool($owner: String!) {
    onUpdateSchool(owner: $owner) {
      id
      name
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSchool = /* GraphQL */ `
  subscription OnDeleteSchool($owner: String!) {
    onDeleteSchool(owner: $owner) {
      id
      name
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onCreateClass = /* GraphQL */ `
  subscription OnCreateClass {
    onCreateClass {
      id
      schoolId
      school {
        id
        name
        owner
        createdAt
        updatedAt
      }
      className
      owner
      createdAt
      updatedAt
      lessons {
        items {
          id
          classId
          startTime
          endTime
          title
          subject {
            name
            color
          }
          goal
          description
          videos {
            title
            url
            thumbnailUrl
          }
          pages
          materials {
            title
            url
          }
          isHidden
          owner
          createdAt
          updatedAt
          class {
            id
            schoolId
            className
            owner
            createdAt
            updatedAt
          }
        }
        nextToken
      }
    }
  }
`;
export const onUpdateClass = /* GraphQL */ `
  subscription OnUpdateClass {
    onUpdateClass {
      id
      schoolId
      school {
        id
        name
        owner
        createdAt
        updatedAt
      }
      className
      owner
      createdAt
      updatedAt
      lessons {
        items {
          id
          classId
          startTime
          endTime
          title
          subject {
            name
            color
          }
          goal
          description
          videos {
            title
            url
            thumbnailUrl
          }
          pages
          materials {
            title
            url
          }
          isHidden
          owner
          createdAt
          updatedAt
          class {
            id
            schoolId
            className
            owner
            createdAt
            updatedAt
          }
        }
        nextToken
      }
    }
  }
`;
export const onDeleteClass = /* GraphQL */ `
  subscription OnDeleteClass {
    onDeleteClass {
      id
      schoolId
      school {
        id
        name
        owner
        createdAt
        updatedAt
      }
      className
      owner
      createdAt
      updatedAt
      lessons {
        items {
          id
          classId
          startTime
          endTime
          title
          subject {
            name
            color
          }
          goal
          description
          videos {
            title
            url
            thumbnailUrl
          }
          pages
          materials {
            title
            url
          }
          isHidden
          owner
          createdAt
          updatedAt
          class {
            id
            schoolId
            className
            owner
            createdAt
            updatedAt
          }
        }
        nextToken
      }
    }
  }
`;
export const onCreateLesson = /* GraphQL */ `
  subscription OnCreateLesson {
    onCreateLesson {
      id
      classId
      startTime
      endTime
      title
      subject {
        name
        color
      }
      goal
      description
      videos {
        title
        url
        thumbnailUrl
      }
      pages
      materials {
        title
        url
      }
      isHidden
      owner
      createdAt
      updatedAt
      class {
        id
        schoolId
        school {
          id
          name
          owner
          createdAt
          updatedAt
        }
        className
        owner
        createdAt
        updatedAt
        lessons {
          items {
            id
            classId
            startTime
            endTime
            title
            goal
            description
            pages
            isHidden
            owner
            createdAt
            updatedAt
          }
          nextToken
        }
      }
    }
  }
`;
export const onUpdateLesson = /* GraphQL */ `
  subscription OnUpdateLesson {
    onUpdateLesson {
      id
      classId
      startTime
      endTime
      title
      subject {
        name
        color
      }
      goal
      description
      videos {
        title
        url
        thumbnailUrl
      }
      pages
      materials {
        title
        url
      }
      isHidden
      owner
      createdAt
      updatedAt
      class {
        id
        schoolId
        school {
          id
          name
          owner
          createdAt
          updatedAt
        }
        className
        owner
        createdAt
        updatedAt
        lessons {
          items {
            id
            classId
            startTime
            endTime
            title
            goal
            description
            pages
            isHidden
            owner
            createdAt
            updatedAt
          }
          nextToken
        }
      }
    }
  }
`;
export const onDeleteLesson = /* GraphQL */ `
  subscription OnDeleteLesson {
    onDeleteLesson {
      id
      classId
      startTime
      endTime
      title
      subject {
        name
        color
      }
      goal
      description
      videos {
        title
        url
        thumbnailUrl
      }
      pages
      materials {
        title
        url
      }
      isHidden
      owner
      createdAt
      updatedAt
      class {
        id
        schoolId
        school {
          id
          name
          owner
          createdAt
          updatedAt
        }
        className
        owner
        createdAt
        updatedAt
        lessons {
          items {
            id
            classId
            startTime
            endTime
            title
            goal
            description
            pages
            isHidden
            owner
            createdAt
            updatedAt
          }
          nextToken
        }
      }
    }
  }
`;
