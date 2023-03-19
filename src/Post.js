import React from 'react';


class Post extends React.Component {

    constructor(title, description, state, props) {
        super(props);

        this.title = title;
        this.description = description;
        this.state = "a_faire";
        this.column = "";
    }

    //on crée des getters pour recuperer les valeurs des posts
    getTitre() {
        return this.title;
    }

    getDescription() {
        return this.description;
    }

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
    }

    toString() {
        return `${this.title} - ${this.description} - ${this.state}`;
    }
}
export default Post;