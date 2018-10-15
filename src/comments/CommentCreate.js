import React from 'react';
import {
  Create,
  DateInput,
  LongTextInput,
  SimpleForm,
  required
} from 'react-admin';
import { parse } from 'query-string';
import PostReferenceInput from './PostReferenceInput';

const today = new Date();

const CommentCreate = props => {
  // Read the post_id from the location which is injected by React Router and passed to our component by react-admin automatically
  const { post_id: post_id_string } = parse(props.location.search);

  // ra-data-fakerest uses integers as identifiers, we need to parse the querystring
  // We also must ensure we can still create a new comment without having a post_id
  // from the url by returning an empty string if post_id isn't specified
  const post_id = post_id_string ? parseInt(post_id_string, 10) : '';

  const redirect = post_id ? `/posts/${post_id}/show/comments` : false;

  return (
    <Create {...props}>
      <SimpleForm
        defaultValue={{ created_at: today, post_id }}
        redirect={redirect}
      >
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
    </Create>
  );
};

export default CommentCreate;
