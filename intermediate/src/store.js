const store = {
    debug: true,
    state: {
        userList: [],
    },
    setUserListAction (newValue) {
        this.debug && console.log('setUserListAction: ', newValue);
        this.state.userList = newValue;
    },
};

export default store;
