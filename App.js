/* import { StatusBar } from 'expo-status-bar'; */
import { Button, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, {useState} from "react";

import { themes } from "./src/constants/themes/index"

export default function App() {
const [task, setTask] = useState("");

const [tasks, setTasks] = useState([])

const [modalVisible, setModalVisible] = useState(false);

const onHandleInput = (Text) => {setTask(Text);};

const [itemSelected, setitemSelected] = useState({})

const onHandleSubmit = () => {
  setTask("");
  setTasks((currentTasks) => [... currentTasks, {id: Math.random(), value: task }, ]);
};

const onHandleDelete = (itemSelected) => {
  setTasks((currentTasks) => currentTasks.filter((task) => task.id != itemSelected.id))
  setitemSelected({});
  setModalVisible(!modalVisible)
}

const handleModal = (id) => {
  console.log({
    element: tasks.filter((item) => item.id == id),
    id,
    positionElement: tasks.filter((item) => item.id == id)[0],
    });
  setitemSelected(tasks.filter((item) => item.id == id)[0]);
  setModalVisible(true);
}

const renderItem = ({ item }) => {
  return (
    <View key={'task-${item.id}'} style={style.containerItem}>
    <Text style={style.item}>{item.value}</Text>
    <TouchableOpacity style={style.deleteButton} onPress={() => handleModal(item.id)}>
      <Text style={style.deleteButtonText}>X</Text>
    </TouchableOpacity>
  </View>
  )
}

const listHeaderComponent = () => {
  return tasks.length > 0 && <Text style={style.titleList}>Task List</Text>;
}

console.warn({ tasks });

  return (
    <View style={themes.container}>
      <View style={style.containerTask} >
        <TextInput style={style.TextInput} placeholder='add new task' value={task} onChangeText={onHandleInput}/>
        <Button  title='ADD' color="#8cbcb9" onPress={onHandleSubmit} disabled={task.length == 0}/>
      </View>



    <FlatList
      ListHeaderComponent={listHeaderComponent}
      style={style.containerList}
      data={tasks}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}

    />
{/*       {tasks.length > 0 && (
        <View style={style.containerList}>
        <Text style={style.titleList}>Task List</Text>
        {tasks.map((item) => (
          <View key={'task-${item.id}'} style={style.containerItem}>
            <Text style={style.item}>{item.value}</Text>
          </View>
        ))}
      </View>
      )}
 */}
<Modal
    animationType='slide'
    visible={modalVisible}
    onRequestClose={() => null}
    style={style.modalContent}
    >
    <View style={style.modalContent}>
      <View style={style.modalTitleContainer}>
        <Text style={style.modalTitle}>Borrarando item</Text>
        <TouchableOpacity style={style.deleteButton} onPress={() => setModalVisible(!modalVisible)}>
          <Text style={style.deleteButtonText}>X</Text>
        </TouchableOpacity>
      </View>
        <Text style={style.modalText}>Desea borrar el siguiente item?</Text>
        <Text style={style.modalMessage}>{itemSelected.value}</Text>

        <Button title='Delete Item' onPress={()=> onHandleDelete(itemSelected) }/>
      
    </View>
    </Modal>
    </View>
  );
}


const style = StyleSheet.create({

  containerTask: {
    marginTop: 40,
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  TextInput: {
    borderColor: "#10f",
    borderStyle: 'dotted',
    borderBottomWidth: 1,
    marginBottom: 10,
    width: "60%",
    height: 40,
    fontSize: 14,
    color: "#2f2121",
  },

  containerList: {
    marginHorizontal: 25,

  },

  containerItem: {
  marginVertical: 10,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  },

  item: {
    fontSize: 14,
    color: "#212121",
  },

  titleList: {
  fontSize: 20,
  fontWeight: "bold",
  alignItems: "center",
  justifyContent: "center",
  },

  deleteButton: {

    backgroundColor: "#BCBCB9",
    padding: 5,
  },

  deleteButtonText: {
    color: "#ffff",
    fontSize: 14,
    fontWeight: "bold",
  },

  modalContent: {
    flex: 1,
    backgroundColor: "#ffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,

  },

  modalText:{
    fontSize: 16,
    marginVertical: 10,
  },

  modalMessage: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#fc4324"
  },

  modalTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

});
