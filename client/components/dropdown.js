import DropdownMenu from 'react-native-dropdown-menu';
import React from "react"
import { View } from "react-native"

export default class Dropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    handle(page) {
        switch (page) {
            case "Logout      ":
                this.props.logout();
                break;

            case "Manage Profile":
                this.props.navigate("UpdateProfile");
                break;
            default:
                break;
        }
        this.props.navigate
    }

    render() {
        var data = [["What's More?", "Manage Profile", "Logout      "]];
        return (
            <View style={{ marginBottom: 40, marginLeft: 10, flex: 1 }}>

                <DropdownMenu
                    style={{ flex: 1 }}
                    bgColor={'white'}
                    tintColor={'#666666'}
                    activityTintColor={'green'}
                    maxHeight={600}
                    handler={(selection, row) => { this.handle(data[selection][row]) }}
                    data={data}
                >



                </DropdownMenu>
            </View>

        );
    }

}