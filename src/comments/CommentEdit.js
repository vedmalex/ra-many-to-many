import React from 'react';
import {
  Edit,
  DateInput,
  LongTextInput,
  SimpleForm,
  required
} from 'react-admin';
import { parse } from 'query-string';
import PostReferenceInput from './PostReferenceInput';

const CommentEdit = props => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <PostReferenceInput
          source="post_id"
          reference="posts"
          allowEmpty
          validate={required()}
          perPage={10000}
        />
        <DateInput source="created_at" />
        <LongTextInput source="body" />
      </SimpleForm>
    </Edit>
  );
};

export default CommentEdit;
