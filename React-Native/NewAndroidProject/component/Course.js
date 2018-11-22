import React from 'react';
import {
    View,
    Image,
    FlatList,
    Text
} from 'react-native';

export default class Courses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        console.log(this.props.slug);
        return fetch(`https://itfun.tv/api/v1/categories/${this.props.slug}.json`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    courses: responseJson.courses,
                });
            })
    }

    _renderItem = ({item}) => (
        <View>
            <Image style={{width:100,height:80}} source={{uri:item.photo}} />
            <Text>
                {item.name}
            </Text>
            <Text
                style={{
                    overflow: 'hidden',
                    height:67
                }}
            >
                {item.body}
            </Text>
        </View>
    );

    render() {

        return (
                <FlatList
                    data={this.state.courses}
                    keyExtractor={item => item.id.toString()}
                    renderItem={this._renderItem}
                />
        );
    }
}
