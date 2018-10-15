import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';

import IconImageEye from '@material-ui/icons/RemoveRedEye';
import IconKeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import {
    Button,
    SimpleShowLayout,
    TextField,
    ReferenceField
} from 'react-admin';

const OPEN_PREVIEW = 'ODA/OPEN_PREVIEW';

const togglePreview = show => ({ type: OPEN_PREVIEW, show });

export const preview = (state = { show: '' }, action) => {
    switch (action.type) {
        case OPEN_PREVIEW:
            console.log(state);
            return {
                ...state,
                show: action.show
            };
        default:
            return state;
    }
};

const styles = theme => ({
    field: {
        // These styles will ensure our drawer don't fully cover our
        // application when teaser or title are very long
        '& span': {
            display: 'inline-block',
            maxWidth: '20em'
        }
    }
});

const PostPreviewView = ({ classes, ...props }) => (
    <SimpleShowLayout {...props}>
        <TextField source="id" />
        <ReferenceField label="User" source="user_id" reference="users">
            <TextField source="name" />
        </ReferenceField>
        <TextField source="title" className={classes.field} />
        <TextField source="teaser" className={classes.field} />
    </SimpleShowLayout>
);

const mapStateToProps = (state, props) => ({
    // Get the record by its id from the react-admin state.
    record: state.admin.resources[props.resource]
        ? state.admin.resources[props.resource].data[props.id]
        : null,
    version: state.admin.ui.viewVersion
});

const PostPreview = connect(
    mapStateToProps,
    {}
)(withStyles(styles)(PostPreviewView));

const PostQuickPreviewButton = props => {
    const { id, resource, basePath, showForm: ShowForm } = props;
    const showPanel = props.preview.show === resource;
    return (
        <Fragment>
            <Button
                onClick={() => props.togglePreview(resource)}
                label="ra.action.show"
            >
                <IconImageEye />
            </Button>
            <Drawer
                anchor="right"
                open={showPanel}
                onClose={() => props.togglePreview('')}
            >
                <div>
                    <Button
                        label="ra.action.cancel"
                        onClick={() => props.togglePreview('')}
                    />
                </div>
                <PostPreview id={id} basePath="/posts" resource="posts" />
            </Drawer>
        </Fragment>
    );
};

export default connect(
    state => ({
        preview: state.preview
    }),
    dispatch => ({
        togglePreview: show => dispatch(togglePreview(show))
    })
)(PostQuickPreviewButton);
