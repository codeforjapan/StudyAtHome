/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateClassInput = {
  id?: string | null,
  className: string,
  schoolName: string,
  owner: string,
};

export type ModelClassConditionInput = {
  className?: ModelStringInput | null,
  schoolName?: ModelStringInput | null,
  and?: Array< ModelClassConditionInput | null > | null,
  or?: Array< ModelClassConditionInput | null > | null,
  not?: ModelClassConditionInput | null,
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

export type UpdateClassInput = {
  id: string,
  className?: string | null,
  schoolName?: string | null,
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

export type ModelClassFilterInput = {
  id?: ModelIDInput | null,
  className?: ModelStringInput | null,
  schoolName?: ModelStringInput | null,
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


export type CreateClassMutationVariables = {
  input: CreateClassInput,
  condition?: ModelClassConditionInput | null,
};

export type CreateClassMutation = {
  createClass:  {
    __typename: "Class",
    id: string,
    className: string,
    schoolName: string,
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
          className: string,
          schoolName: string,
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
    className: string,
    schoolName: string,
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
          className: string,
          schoolName: string,
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
    className: string,
    schoolName: string,
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
          className: string,
          schoolName: string,
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
      className: string,
      schoolName: string,
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
      className: string,
      schoolName: string,
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
      className: string,
      schoolName: string,
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
      className: string,
      schoolName: string,
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
    className: string,
    schoolName: string,
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
          className: string,
          schoolName: string,
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
      className: string,
      schoolName: string,
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
        className: string,
        schoolName: string,
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
        className: string,
        schoolName: string,
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

export type OnCreateClassSubscription = {
  onCreateClass:  {
    __typename: "Class",
    id: string,
    className: string,
    schoolName: string,
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
          className: string,
          schoolName: string,
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
    className: string,
    schoolName: string,
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
          className: string,
          schoolName: string,
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
    className: string,
    schoolName: string,
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
          className: string,
          schoolName: string,
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
      className: string,
      schoolName: string,
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
      className: string,
      schoolName: string,
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
      className: string,
      schoolName: string,
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
