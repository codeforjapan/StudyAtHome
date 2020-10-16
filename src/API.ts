/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateSchoolInput = {
  id?: string | null,
  name: string,
  owner: string,
};

export type ModelSchoolConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelSchoolConditionInput | null > | null,
  or?: Array< ModelSchoolConditionInput | null > | null,
  not?: ModelSchoolConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateSchoolInput = {
  id: string,
  name?: string | null,
  owner?: string | null,
};

export type DeleteSchoolInput = {
  id?: string | null,
};

export type CreateClassInput = {
  id?: string | null,
  schoolId: string,
  className: string,
  owner: string,
};

export type ModelClassConditionInput = {
  schoolId?: ModelIDInput | null,
  className?: ModelStringInput | null,
  and?: Array< ModelClassConditionInput | null > | null,
  or?: Array< ModelClassConditionInput | null > | null,
  not?: ModelClassConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateClassInput = {
  id: string,
  schoolId?: string | null,
  className?: string | null,
  owner?: string | null,
};

export type DeleteClassInput = {
  id?: string | null,
};

export type CreateLessonInput = {
  id?: string | null,
  classId: string,
  startTime: string,
  endTime: string,
  title: string,
  subject: SubjectInput,
  goal?: string | null,
  description?: string | null,
  videos?: Array< VideoInput > | null,
  pages?: string | null,
  materials?: Array< MaterialInput > | null,
  isHidden: boolean,
  owner: string,
};

export type SubjectInput = {
  name: string,
  color: string,
};

export type VideoInput = {
  title?: string | null,
  url: string,
  thumbnailUrl?: string | null,
};

export type MaterialInput = {
  title?: string | null,
  url: string,
};

export type ModelLessonConditionInput = {
  classId?: ModelIDInput | null,
  startTime?: ModelStringInput | null,
  endTime?: ModelStringInput | null,
  title?: ModelStringInput | null,
  goal?: ModelStringInput | null,
  description?: ModelStringInput | null,
  pages?: ModelStringInput | null,
  isHidden?: ModelBooleanInput | null,
  and?: Array< ModelLessonConditionInput | null > | null,
  or?: Array< ModelLessonConditionInput | null > | null,
  not?: ModelLessonConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateLessonInput = {
  id: string,
  classId?: string | null,
  startTime?: string | null,
  endTime?: string | null,
  title?: string | null,
  subject?: SubjectInput | null,
  goal?: string | null,
  description?: string | null,
  videos?: Array< VideoInput > | null,
  pages?: string | null,
  materials?: Array< MaterialInput > | null,
  isHidden?: boolean | null,
  owner?: string | null,
};

export type DeleteLessonInput = {
  id?: string | null,
};

export type ModelSchoolFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelSchoolFilterInput | null > | null,
  or?: Array< ModelSchoolFilterInput | null > | null,
  not?: ModelSchoolFilterInput | null,
};

export type ModelClassFilterInput = {
  id?: ModelIDInput | null,
  schoolId?: ModelIDInput | null,
  className?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelClassFilterInput | null > | null,
  or?: Array< ModelClassFilterInput | null > | null,
  not?: ModelClassFilterInput | null,
};

export type ModelLessonFilterInput = {
  id?: ModelIDInput | null,
  classId?: ModelIDInput | null,
  startTime?: ModelStringInput | null,
  endTime?: ModelStringInput | null,
  title?: ModelStringInput | null,
  goal?: ModelStringInput | null,
  description?: ModelStringInput | null,
  pages?: ModelStringInput | null,
  isHidden?: ModelBooleanInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelLessonFilterInput | null > | null,
  or?: Array< ModelLessonFilterInput | null > | null,
  not?: ModelLessonFilterInput | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreateSchoolMutationVariables = {
  input: CreateSchoolInput,
  condition?: ModelSchoolConditionInput | null,
};

export type CreateSchoolMutation = {
  createSchool:  {
    __typename: "School",
    id: string,
    name: string,
    owner: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSchoolMutationVariables = {
  input: UpdateSchoolInput,
  condition?: ModelSchoolConditionInput | null,
};

export type UpdateSchoolMutation = {
  updateSchool:  {
    __typename: "School",
    id: string,
    name: string,
    owner: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSchoolMutationVariables = {
  input: DeleteSchoolInput,
  condition?: ModelSchoolConditionInput | null,
};

export type DeleteSchoolMutation = {
  deleteSchool:  {
    __typename: "School",
    id: string,
    name: string,
    owner: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateClassMutationVariables = {
  input: CreateClassInput,
  condition?: ModelClassConditionInput | null,
};

export type CreateClassMutation = {
  createClass:  {
    __typename: "Class",
    id: string,
    schoolId: string,
    school:  {
      __typename: "School",
      id: string,
      name: string,
      owner: string,
      createdAt: string,
      updatedAt: string,
    },
    className: string,
    owner: string,
    createdAt: string,
    updatedAt: string,
    lessons:  {
      __typename: "ModelLessonConnection",
      items:  Array< {
        __typename: "Lesson",
        id: string,
        classId: string,
        startTime: string,
        endTime: string,
        title: string,
        subject:  {
          __typename: "Subject",
          name: string,
          color: string,
        },
        goal: string | null,
        description: string | null,
        videos:  Array< {
          __typename: "Video",
          title: string | null,
          url: string,
          thumbnailUrl: string | null,
        } > | null,
        pages: string | null,
        materials:  Array< {
          __typename: "Material",
          title: string | null,
          url: string,
        } > | null,
        isHidden: boolean,
        owner: string,
        createdAt: string,
        updatedAt: string,
        class:  {
          __typename: "Class",
          id: string,
          schoolId: string,
          className: string,
          owner: string,
          createdAt: string,
          updatedAt: string,
        },
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateClassMutationVariables = {
  input: UpdateClassInput,
  condition?: ModelClassConditionInput | null,
};

export type UpdateClassMutation = {
  updateClass:  {
    __typename: "Class",
    id: string,
    schoolId: string,
    school:  {
      __typename: "School",
      id: string,
      name: string,
      owner: string,
      createdAt: string,
      updatedAt: string,
    },
    className: string,
    owner: string,
    createdAt: string,
    updatedAt: string,
    lessons:  {
      __typename: "ModelLessonConnection",
      items:  Array< {
        __typename: "Lesson",
        id: string,
        classId: string,
        startTime: string,
        endTime: string,
        title: string,
        subject:  {
          __typename: "Subject",
          name: string,
          color: string,
        },
        goal: string | null,
        description: string | null,
        videos:  Array< {
          __typename: "Video",
          title: string | null,
          url: string,
          thumbnailUrl: string | null,
        } > | null,
        pages: string | null,
        materials:  Array< {
          __typename: "Material",
          title: string | null,
          url: string,
        } > | null,
        isHidden: boolean,
        owner: string,
        createdAt: string,
        updatedAt: string,
        class:  {
          __typename: "Class",
          id: string,
          schoolId: string,
          className: string,
          owner: string,
          createdAt: string,
          updatedAt: string,
        },
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteClassMutationVariables = {
  input: DeleteClassInput,
  condition?: ModelClassConditionInput | null,
};

export type DeleteClassMutation = {
  deleteClass:  {
    __typename: "Class",
    id: string,
    schoolId: string,
    school:  {
      __typename: "School",
      id: string,
      name: string,
      owner: string,
      createdAt: string,
      updatedAt: string,
    },
    className: string,
    owner: string,
    createdAt: string,
    updatedAt: string,
    lessons:  {
      __typename: "ModelLessonConnection",
      items:  Array< {
        __typename: "Lesson",
        id: string,
        classId: string,
        startTime: string,
        endTime: string,
        title: string,
        subject:  {
          __typename: "Subject",
          name: string,
          color: string,
        },
        goal: string | null,
        description: string | null,
        videos:  Array< {
          __typename: "Video",
          title: string | null,
          url: string,
          thumbnailUrl: string | null,
        } > | null,
        pages: string | null,
        materials:  Array< {
          __typename: "Material",
          title: string | null,
          url: string,
        } > | null,
        isHidden: boolean,
        owner: string,
        createdAt: string,
        updatedAt: string,
        class:  {
          __typename: "Class",
          id: string,
          schoolId: string,
          className: string,
          owner: string,
          createdAt: string,
          updatedAt: string,
        },
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateLessonMutationVariables = {
  input: CreateLessonInput,
  condition?: ModelLessonConditionInput | null,
};

export type CreateLessonMutation = {
  createLesson:  {
    __typename: "Lesson",
    id: string,
    classId: string,
    startTime: string,
    endTime: string,
    title: string,
    subject:  {
      __typename: "Subject",
      name: string,
      color: string,
    },
    goal: string | null,
    description: string | null,
    videos:  Array< {
      __typename: "Video",
      title: string | null,
      url: string,
      thumbnailUrl: string | null,
    } > | null,
    pages: string | null,
    materials:  Array< {
      __typename: "Material",
      title: string | null,
      url: string,
    } > | null,
    isHidden: boolean,
    owner: string,
    createdAt: string,
    updatedAt: string,
    class:  {
      __typename: "Class",
      id: string,
      schoolId: string,
      school:  {
        __typename: "School",
        id: string,
        name: string,
        owner: string,
        createdAt: string,
        updatedAt: string,
      },
      className: string,
      owner: string,
      createdAt: string,
      updatedAt: string,
      lessons:  {
        __typename: "ModelLessonConnection",
        items:  Array< {
          __typename: "Lesson",
          id: string,
          classId: string,
          startTime: string,
          endTime: string,
          title: string,
          goal: string | null,
          description: string | null,
          pages: string | null,
          isHidden: boolean,
          owner: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type UpdateLessonMutationVariables = {
  input: UpdateLessonInput,
  condition?: ModelLessonConditionInput | null,
};

export type UpdateLessonMutation = {
  updateLesson:  {
    __typename: "Lesson",
    id: string,
    classId: string,
    startTime: string,
    endTime: string,
    title: string,
    subject:  {
      __typename: "Subject",
      name: string,
      color: string,
    },
    goal: string | null,
    description: string | null,
    videos:  Array< {
      __typename: "Video",
      title: string | null,
      url: string,
      thumbnailUrl: string | null,
    } > | null,
    pages: string | null,
    materials:  Array< {
      __typename: "Material",
      title: string | null,
      url: string,
    } > | null,
    isHidden: boolean,
    owner: string,
    createdAt: string,
    updatedAt: string,
    class:  {
      __typename: "Class",
      id: string,
      schoolId: string,
      school:  {
        __typename: "School",
        id: string,
        name: string,
        owner: string,
        createdAt: string,
        updatedAt: string,
      },
      className: string,
      owner: string,
      createdAt: string,
      updatedAt: string,
      lessons:  {
        __typename: "ModelLessonConnection",
        items:  Array< {
          __typename: "Lesson",
          id: string,
          classId: string,
          startTime: string,
          endTime: string,
          title: string,
          goal: string | null,
          description: string | null,
          pages: string | null,
          isHidden: boolean,
          owner: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type DeleteLessonMutationVariables = {
  input: DeleteLessonInput,
  condition?: ModelLessonConditionInput | null,
};

export type DeleteLessonMutation = {
  deleteLesson:  {
    __typename: "Lesson",
    id: string,
    classId: string,
    startTime: string,
    endTime: string,
    title: string,
    subject:  {
      __typename: "Subject",
      name: string,
      color: string,
    },
    goal: string | null,
    description: string | null,
    videos:  Array< {
      __typename: "Video",
      title: string | null,
      url: string,
      thumbnailUrl: string | null,
    } > | null,
    pages: string | null,
    materials:  Array< {
      __typename: "Material",
      title: string | null,
      url: string,
    } > | null,
    isHidden: boolean,
    owner: string,
    createdAt: string,
    updatedAt: string,
    class:  {
      __typename: "Class",
      id: string,
      schoolId: string,
      school:  {
        __typename: "School",
        id: string,
        name: string,
        owner: string,
        createdAt: string,
        updatedAt: string,
      },
      className: string,
      owner: string,
      createdAt: string,
      updatedAt: string,
      lessons:  {
        __typename: "ModelLessonConnection",
        items:  Array< {
          __typename: "Lesson",
          id: string,
          classId: string,
          startTime: string,
          endTime: string,
          title: string,
          goal: string | null,
          description: string | null,
          pages: string | null,
          isHidden: boolean,
          owner: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type GetSchoolQueryVariables = {
  id: string,
};

export type GetSchoolQuery = {
  getSchool:  {
    __typename: "School",
    id: string,
    name: string,
    owner: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSchoolsQueryVariables = {
  filter?: ModelSchoolFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSchoolsQuery = {
  listSchools:  {
    __typename: "ModelSchoolConnection",
    items:  Array< {
      __typename: "School",
      id: string,
      name: string,
      owner: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ListClasssQueryVariables = {
  filter?: ModelClassFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListClasssQuery = {
  listClasss:  {
    __typename: "ModelClassConnection",
    items:  Array< {
      __typename: "Class",
      id: string,
      schoolId: string,
      school:  {
        __typename: "School",
        id: string,
        name: string,
        owner: string,
        createdAt: string,
        updatedAt: string,
      },
      className: string,
      owner: string,
      createdAt: string,
      updatedAt: string,
      lessons:  {
        __typename: "ModelLessonConnection",
        items:  Array< {
          __typename: "Lesson",
          id: string,
          classId: string,
          startTime: string,
          endTime: string,
          title: string,
          goal: string | null,
          description: string | null,
          pages: string | null,
          isHidden: boolean,
          owner: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetClassQueryVariables = {
  id: string,
};

export type GetClassQuery = {
  getClass:  {
    __typename: "Class",
    id: string,
    schoolId: string,
    school:  {
      __typename: "School",
      id: string,
      name: string,
      owner: string,
      createdAt: string,
      updatedAt: string,
    },
    className: string,
    owner: string,
    createdAt: string,
    updatedAt: string,
    lessons:  {
      __typename: "ModelLessonConnection",
      items:  Array< {
        __typename: "Lesson",
        id: string,
        classId: string,
        startTime: string,
        endTime: string,
        title: string,
        subject:  {
          __typename: "Subject",
          name: string,
          color: string,
        },
        goal: string | null,
        description: string | null,
        videos:  Array< {
          __typename: "Video",
          title: string | null,
          url: string,
          thumbnailUrl: string | null,
        } > | null,
        pages: string | null,
        materials:  Array< {
          __typename: "Material",
          title: string | null,
          url: string,
        } > | null,
        isHidden: boolean,
        owner: string,
        createdAt: string,
        updatedAt: string,
        class:  {
          __typename: "Class",
          id: string,
          schoolId: string,
          className: string,
          owner: string,
          createdAt: string,
          updatedAt: string,
        },
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type GetLessonQueryVariables = {
  id: string,
};

export type GetLessonQuery = {
  getLesson:  {
    __typename: "Lesson",
    id: string,
    classId: string,
    startTime: string,
    endTime: string,
    title: string,
    subject:  {
      __typename: "Subject",
      name: string,
      color: string,
    },
    goal: string | null,
    description: string | null,
    videos:  Array< {
      __typename: "Video",
      title: string | null,
      url: string,
      thumbnailUrl: string | null,
    } > | null,
    pages: string | null,
    materials:  Array< {
      __typename: "Material",
      title: string | null,
      url: string,
    } > | null,
    isHidden: boolean,
    owner: string,
    createdAt: string,
    updatedAt: string,
    class:  {
      __typename: "Class",
      id: string,
      schoolId: string,
      school:  {
        __typename: "School",
        id: string,
        name: string,
        owner: string,
        createdAt: string,
        updatedAt: string,
      },
      className: string,
      owner: string,
      createdAt: string,
      updatedAt: string,
      lessons:  {
        __typename: "ModelLessonConnection",
        items:  Array< {
          __typename: "Lesson",
          id: string,
          classId: string,
          startTime: string,
          endTime: string,
          title: string,
          goal: string | null,
          description: string | null,
          pages: string | null,
          isHidden: boolean,
          owner: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type ListLessonsQueryVariables = {
  filter?: ModelLessonFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLessonsQuery = {
  listLessons:  {
    __typename: "ModelLessonConnection",
    items:  Array< {
      __typename: "Lesson",
      id: string,
      classId: string,
      startTime: string,
      endTime: string,
      title: string,
      subject:  {
        __typename: "Subject",
        name: string,
        color: string,
      },
      goal: string | null,
      description: string | null,
      videos:  Array< {
        __typename: "Video",
        title: string | null,
        url: string,
        thumbnailUrl: string | null,
      } > | null,
      pages: string | null,
      materials:  Array< {
        __typename: "Material",
        title: string | null,
        url: string,
      } > | null,
      isHidden: boolean,
      owner: string,
      createdAt: string,
      updatedAt: string,
      class:  {
        __typename: "Class",
        id: string,
        schoolId: string,
        school:  {
          __typename: "School",
          id: string,
          name: string,
          owner: string,
          createdAt: string,
          updatedAt: string,
        },
        className: string,
        owner: string,
        createdAt: string,
        updatedAt: string,
        lessons:  {
          __typename: "ModelLessonConnection",
          nextToken: string | null,
        } | null,
      },
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ListLessonsByClassQueryVariables = {
  classId?: string | null,
  startTime?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelLessonFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLessonsByClassQuery = {
  listLessonsByClass:  {
    __typename: "ModelLessonConnection",
    items:  Array< {
      __typename: "Lesson",
      id: string,
      classId: string,
      startTime: string,
      endTime: string,
      title: string,
      subject:  {
        __typename: "Subject",
        name: string,
        color: string,
      },
      goal: string | null,
      description: string | null,
      videos:  Array< {
        __typename: "Video",
        title: string | null,
        url: string,
        thumbnailUrl: string | null,
      } > | null,
      pages: string | null,
      materials:  Array< {
        __typename: "Material",
        title: string | null,
        url: string,
      } > | null,
      isHidden: boolean,
      owner: string,
      createdAt: string,
      updatedAt: string,
      class:  {
        __typename: "Class",
        id: string,
        schoolId: string,
        school:  {
          __typename: "School",
          id: string,
          name: string,
          owner: string,
          createdAt: string,
          updatedAt: string,
        },
        className: string,
        owner: string,
        createdAt: string,
        updatedAt: string,
        lessons:  {
          __typename: "ModelLessonConnection",
          nextToken: string | null,
        } | null,
      },
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateSchoolSubscriptionVariables = {
  owner: string,
};

export type OnCreateSchoolSubscription = {
  onCreateSchool:  {
    __typename: "School",
    id: string,
    name: string,
    owner: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSchoolSubscriptionVariables = {
  owner: string,
};

export type OnUpdateSchoolSubscription = {
  onUpdateSchool:  {
    __typename: "School",
    id: string,
    name: string,
    owner: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSchoolSubscriptionVariables = {
  owner: string,
};

export type OnDeleteSchoolSubscription = {
  onDeleteSchool:  {
    __typename: "School",
    id: string,
    name: string,
    owner: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateClassSubscription = {
  onCreateClass:  {
    __typename: "Class",
    id: string,
    schoolId: string,
    school:  {
      __typename: "School",
      id: string,
      name: string,
      owner: string,
      createdAt: string,
      updatedAt: string,
    },
    className: string,
    owner: string,
    createdAt: string,
    updatedAt: string,
    lessons:  {
      __typename: "ModelLessonConnection",
      items:  Array< {
        __typename: "Lesson",
        id: string,
        classId: string,
        startTime: string,
        endTime: string,
        title: string,
        subject:  {
          __typename: "Subject",
          name: string,
          color: string,
        },
        goal: string | null,
        description: string | null,
        videos:  Array< {
          __typename: "Video",
          title: string | null,
          url: string,
          thumbnailUrl: string | null,
        } > | null,
        pages: string | null,
        materials:  Array< {
          __typename: "Material",
          title: string | null,
          url: string,
        } > | null,
        isHidden: boolean,
        owner: string,
        createdAt: string,
        updatedAt: string,
        class:  {
          __typename: "Class",
          id: string,
          schoolId: string,
          className: string,
          owner: string,
          createdAt: string,
          updatedAt: string,
        },
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateClassSubscription = {
  onUpdateClass:  {
    __typename: "Class",
    id: string,
    schoolId: string,
    school:  {
      __typename: "School",
      id: string,
      name: string,
      owner: string,
      createdAt: string,
      updatedAt: string,
    },
    className: string,
    owner: string,
    createdAt: string,
    updatedAt: string,
    lessons:  {
      __typename: "ModelLessonConnection",
      items:  Array< {
        __typename: "Lesson",
        id: string,
        classId: string,
        startTime: string,
        endTime: string,
        title: string,
        subject:  {
          __typename: "Subject",
          name: string,
          color: string,
        },
        goal: string | null,
        description: string | null,
        videos:  Array< {
          __typename: "Video",
          title: string | null,
          url: string,
          thumbnailUrl: string | null,
        } > | null,
        pages: string | null,
        materials:  Array< {
          __typename: "Material",
          title: string | null,
          url: string,
        } > | null,
        isHidden: boolean,
        owner: string,
        createdAt: string,
        updatedAt: string,
        class:  {
          __typename: "Class",
          id: string,
          schoolId: string,
          className: string,
          owner: string,
          createdAt: string,
          updatedAt: string,
        },
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteClassSubscription = {
  onDeleteClass:  {
    __typename: "Class",
    id: string,
    schoolId: string,
    school:  {
      __typename: "School",
      id: string,
      name: string,
      owner: string,
      createdAt: string,
      updatedAt: string,
    },
    className: string,
    owner: string,
    createdAt: string,
    updatedAt: string,
    lessons:  {
      __typename: "ModelLessonConnection",
      items:  Array< {
        __typename: "Lesson",
        id: string,
        classId: string,
        startTime: string,
        endTime: string,
        title: string,
        subject:  {
          __typename: "Subject",
          name: string,
          color: string,
        },
        goal: string | null,
        description: string | null,
        videos:  Array< {
          __typename: "Video",
          title: string | null,
          url: string,
          thumbnailUrl: string | null,
        } > | null,
        pages: string | null,
        materials:  Array< {
          __typename: "Material",
          title: string | null,
          url: string,
        } > | null,
        isHidden: boolean,
        owner: string,
        createdAt: string,
        updatedAt: string,
        class:  {
          __typename: "Class",
          id: string,
          schoolId: string,
          className: string,
          owner: string,
          createdAt: string,
          updatedAt: string,
        },
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateLessonSubscription = {
  onCreateLesson:  {
    __typename: "Lesson",
    id: string,
    classId: string,
    startTime: string,
    endTime: string,
    title: string,
    subject:  {
      __typename: "Subject",
      name: string,
      color: string,
    },
    goal: string | null,
    description: string | null,
    videos:  Array< {
      __typename: "Video",
      title: string | null,
      url: string,
      thumbnailUrl: string | null,
    } > | null,
    pages: string | null,
    materials:  Array< {
      __typename: "Material",
      title: string | null,
      url: string,
    } > | null,
    isHidden: boolean,
    owner: string,
    createdAt: string,
    updatedAt: string,
    class:  {
      __typename: "Class",
      id: string,
      schoolId: string,
      school:  {
        __typename: "School",
        id: string,
        name: string,
        owner: string,
        createdAt: string,
        updatedAt: string,
      },
      className: string,
      owner: string,
      createdAt: string,
      updatedAt: string,
      lessons:  {
        __typename: "ModelLessonConnection",
        items:  Array< {
          __typename: "Lesson",
          id: string,
          classId: string,
          startTime: string,
          endTime: string,
          title: string,
          goal: string | null,
          description: string | null,
          pages: string | null,
          isHidden: boolean,
          owner: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type OnUpdateLessonSubscription = {
  onUpdateLesson:  {
    __typename: "Lesson",
    id: string,
    classId: string,
    startTime: string,
    endTime: string,
    title: string,
    subject:  {
      __typename: "Subject",
      name: string,
      color: string,
    },
    goal: string | null,
    description: string | null,
    videos:  Array< {
      __typename: "Video",
      title: string | null,
      url: string,
      thumbnailUrl: string | null,
    } > | null,
    pages: string | null,
    materials:  Array< {
      __typename: "Material",
      title: string | null,
      url: string,
    } > | null,
    isHidden: boolean,
    owner: string,
    createdAt: string,
    updatedAt: string,
    class:  {
      __typename: "Class",
      id: string,
      schoolId: string,
      school:  {
        __typename: "School",
        id: string,
        name: string,
        owner: string,
        createdAt: string,
        updatedAt: string,
      },
      className: string,
      owner: string,
      createdAt: string,
      updatedAt: string,
      lessons:  {
        __typename: "ModelLessonConnection",
        items:  Array< {
          __typename: "Lesson",
          id: string,
          classId: string,
          startTime: string,
          endTime: string,
          title: string,
          goal: string | null,
          description: string | null,
          pages: string | null,
          isHidden: boolean,
          owner: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type OnDeleteLessonSubscription = {
  onDeleteLesson:  {
    __typename: "Lesson",
    id: string,
    classId: string,
    startTime: string,
    endTime: string,
    title: string,
    subject:  {
      __typename: "Subject",
      name: string,
      color: string,
    },
    goal: string | null,
    description: string | null,
    videos:  Array< {
      __typename: "Video",
      title: string | null,
      url: string,
      thumbnailUrl: string | null,
    } > | null,
    pages: string | null,
    materials:  Array< {
      __typename: "Material",
      title: string | null,
      url: string,
    } > | null,
    isHidden: boolean,
    owner: string,
    createdAt: string,
    updatedAt: string,
    class:  {
      __typename: "Class",
      id: string,
      schoolId: string,
      school:  {
        __typename: "School",
        id: string,
        name: string,
        owner: string,
        createdAt: string,
        updatedAt: string,
      },
      className: string,
      owner: string,
      createdAt: string,
      updatedAt: string,
      lessons:  {
        __typename: "ModelLessonConnection",
        items:  Array< {
          __typename: "Lesson",
          id: string,
          classId: string,
          startTime: string,
          endTime: string,
          title: string,
          goal: string | null,
          description: string | null,
          pages: string | null,
          isHidden: boolean,
          owner: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
    },
  } | null,
};
