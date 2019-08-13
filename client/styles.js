import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: 'center',
    marginTop: 20,
    //flex: 1

  },
  title: {
    marginBottom: 20,
    color: "brown",
    fontSize: 35
  },
  formField: {
    display: "flex"

  },
  formInput: {
    borderBottomWidth: 1,
    fontSize: 25,
    marginBottom: 10,

  },
  formLable: {
    marginBottom: 10,
    fontSize: 20,
    marginTop: 10
  },
  formButton: {
    marginTop: 10,
    width: 200,

    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10

  }

});

export default styles;