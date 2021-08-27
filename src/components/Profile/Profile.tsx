import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo';
import MyPost from './Posts/MyPost';
import {PostWrapper} from './Posts/PostsWrapper';
import axios from 'axios';
import {SetUserProfileActionCreator, UserProfileType} from '../../redux/profile-reducer';
import {AppStateType} from '../../redux/redux-store';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {GetUserProfile} from '../../api/api';

type PathParamsType = {
    userId: string | undefined
}

type PropsType = ProfileMapStateToPropsType & MapDispatchToPropsType
type ProfilePropsType = RouteComponentProps<PathParamsType> & PropsType

export class Profile extends React.Component<ProfilePropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = '2';
        }
        GetUserProfile(+userId)
            .then(response => {
                this.props.SetUserProfile(response.data);
            });
    }

    render() {
        return <div className={s.profileCont}>
            <img className={s.mainImage}
                 src="https://images.ctfassets.net/hrltx12pl8hq/4f6DfV5DbqaQUSw0uo0mWi/ff068ff5fc855601751499d694c0111a/shutterstock_376532611.jpg?fit=fill&w=800&h=300"/>
            <ProfileInfo photo={this.props.userProfile.photos?.small}/>
            <MyPost/>
            <PostWrapper/>
        </div>;
    }
}

export default Profile;
type ProfileMapStateToPropsType = {
    userProfile: UserProfileType
}

const MapStateToProps = (state: AppStateType): ProfileMapStateToPropsType => {
    return {
        userProfile: state.profilePage.userProfile
    };
};
export type MapDispatchToPropsType = {
    SetUserProfile: (profileData: UserProfileType) => void
}
const ComponentWithURLData = withRouter(Profile);
export const ProfileContainer = connect(MapStateToProps, {SetUserProfile: SetUserProfileActionCreator})(ComponentWithURLData);


