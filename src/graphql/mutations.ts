/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSchool = /* GraphQL */ `
  mutation CreateSchool(
    $input: CreateSchoolInput!
    $condition: ModelSchoolConditionInput
  ) {
    createSchool(input: $input, condition: $condition) {
      id
      name
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateSchool = /* GraphQL */ `
  mutation UpdateSchool(
    $input: UpdateSchoolInput!
    $condition: ModelSchoolConditionInput
  ) {
    updateSchool(input: $input, condition: $condition) {
      id
      name
      owner
      createdAt
      updatedAt
    }
  }
`;
export const deleteSchool = /* GraphQL */ `
  mutation DeleteSchool(
    $input: DeleteSchoolInput!
    $condition: ModelSchoolConditionInput
  ) {
    deleteSchool(input: $input, condition: $condition) {
      id
      name
      owner
      createdAt
      updatedAt
    }
  }
`;
export const createClass = /* GraphQL */ `
  mutation CreateClass(
    $input: CreateClassInput!
    $condition: ModelClassConditionInput
  ) {
    createClass(input: $input, condition: $condition) {
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
export const updateClass = /* GraphQL */ `
  mutation UpdateClass(
    $input: UpdateClassInput!
    $condition: ModelClassConditionInput
  ) {
    updateClass(input: $input, condition: $condition) {
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
export const deleteClass = /* GraphQL */ `
  mutation DeleteClass(
    $input: DeleteClassInput!
    $condition: ModelClassConditionInput
  ) {
    deleteClass(input: $input, condition: $condition) {
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
export const createLesson = /* GraphQL */ `
  mutation CreateLesson(
    $input: CreateLessonInput!
    $condition: ModelLessonConditionInput
  ) {
    createLesson(input: $input, condition: $condition) {
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
export const updateLesson = /* GraphQL */ `
  mutation UpdateLesson(
    $input: UpdateLessonInput!
    $condition: ModelLessonConditionInput
  ) {
    updateLesson(input: $input, condition: $condition) {
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
export const deleteLesson = /* GraphQL */ `
  mutation DeleteLesson(
    $input: DeleteLessonInput!
    $condition: ModelLessonConditionInput
  ) {
    deleteLesson(input: $input, condition: $condition) {
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
