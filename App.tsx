import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, StyleSheet, Text, View, Modal, Image, TextInput, Alert, FlatList } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker'; // Import the Picker component

export default function App() {
  const [isStartersModalVisible, setStartersModalVisible] = useState(false);
  const [isMainDishModalVisible, setMainDishModalVisible] = useState(false);
  const [isDessertModalVisible, setDessertModalVisible] = useState(false);
  const [isAddItemModalVisible, setAddItemModalVisible] = useState(false);
  const [isCheckoutModalVisible, setCheckoutModalVisible] = useState(false); // New checkout modal state
  const [isOrderConfirmationVisible, setOrderConfirmationVisible] = useState(false); // New order confirmation modal state
  

  const [menuItems, setMenuItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // State for category selection

  const logoImg = require("./assets/Buffalo-wings.png");
  const maindish = require('./assets/Chicken-tikka-masala.png');
  const Dessert = require('./assets/Red-velvet-cake.png');

  const handleAddItem = () => {
    if (!itemName || !itemPrice || !selectedCategory) {
      Alert.alert("Error", "Please fill in all fields and select a category.");
      return;
    }

    const newItem = {
      id: Date.now().toString(), // unique id for each item
      name: itemName,
      price: itemPrice,
      category: selectedCategory // Include the selected category
    };

    setMenuItems([...menuItems, newItem]);
    Alert.alert("Item Added", `${itemName} has been added to the menu!`);

    // Clear input fields
    setItemName('');
    setItemPrice('');
    setSelectedCategory(''); // Clear the selected category
    setAddItemModalVisible(false);
  };

  const handleDeleteItem = (id: any) => {
    const updatedItems = menuItems.filter(item => item.id !== id);
    setMenuItems(updatedItems);
    Alert.alert("Item Removed", "Menu item has been removed.");
  };

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItemContainer}>
      <Text style={styles.menuItemText}>{item.name} - {item.price} ({item.category})</Text>
      <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAddItemModal = () => (
    <Modal
      visible={isAddItemModalVisible}
      onRequestClose={() => setAddItemModalVisible(false)}
      animationType='slide'
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Add Menu Item</Text>
        
        {/* Category Picker */}
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Starters" value="Starters" />
          <Picker.Item label="Main Dish" value="Main Dish" />
          <Picker.Item label="Dessert" value="Dessert" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Item Name"
          value={itemName}
          onChangeText={setItemName}
        />
        <TextInput
          style={styles.input}
          placeholder="Price (e.g., R150)"
          value={itemPrice}
          onChangeText={setItemPrice}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddItem}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setAddItemModalVisible(false)}>
          <Text style={styles.buttonText}>Back to Menu</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  const renderCheckoutModal = () => (
    <Modal
      visible={isCheckoutModalVisible}
      onRequestClose={() => setCheckoutModalVisible(false)}
      animationType='slide'
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Thank you for ordering the meal!</Text>
        <TouchableOpacity style={styles.button} onPress={() => setCheckoutModalVisible(false)}>
          <Text style={styles.buttonText}>Back to Menu</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  const renderOrderConfirmationModal = () => (
    <Modal
      visible={isOrderConfirmationVisible}
      onRequestClose={() => setOrderConfirmationVisible(false)}
      animationType='slide'
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Order Confirmation</Text>
        <Text>You have ordered the starters and main dish!</Text>
        <TouchableOpacity style={styles.button} onPress={() => setOrderConfirmationVisible(false)}>
          <Text style={styles.buttonText}>Back to Menu</Text>
        </TouchableOpacity>
      </View>
    </Modal>
    
  );

  return (
    <View style={styles.container}>
      <Text style={styles.Menutitle}>Menu List</Text>
      <Text style={styles.countText}>Total Menu Items: {menuItems.length}</Text>

      {/* Add Item Button */}
      <TouchableOpacity style={styles.button} onPress={() => setAddItemModalVisible(true)}>
        <Text style={styles.buttonText}>Add Menu Item</Text>
      </TouchableOpacity>

      {/* Order Starters and Main Button */}
      <TouchableOpacity style={styles.button} onPress={() => setOrderConfirmationVisible(true)}>
        <Text style={styles.buttonText}>Order Starters&Main</Text>
      </TouchableOpacity>

      {/* Display Menu Items */}
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No items in the menu yet.</Text>}
        style={styles.menuList}
      />

      {/* Render Add Item Modal */}
      {renderAddItemModal()}

      {/* Render Checkout Modal */}
      {renderCheckoutModal()}

      {/* Render Order Confirmation Modal */}
      {renderOrderConfirmationModal()}

      {/* Starters Button */}
      <View style={styles.buttonContainer}>
        <Image source={logoImg} style={styles.image} />
        <TouchableOpacity style={styles.button} onPress={() => setStartersModalVisible(true)}>
          <Text style={styles.buttonText}>Starters Menu</Text>
        </TouchableOpacity>
      </View>

      {/* Main Dish Button */}
      <View style={styles.buttonContainer}>
        <Image source={maindish} style={styles.image} />
        <TouchableOpacity style={styles.button} onPress={() => setMainDishModalVisible(true)}>
          <Text style={styles.buttonText}>Main Dish</Text>
        </TouchableOpacity>
      </View>

      {/* Dessert Button */}
      <View style={styles.buttonContainer}>
        <Image source={Dessert} style={styles.image} />
        <TouchableOpacity style={styles.button} onPress={() => setDessertModalVisible(true)}>
          <Text style={styles.buttonText}>Dessert Dish</Text>
        </TouchableOpacity>
      </View>

      {/* Starters Modal */}
      <Modal 
        visible={isStartersModalVisible} 
        onRequestClose={() => setStartersModalVisible(false)}
        animationType='slide'
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Starters Menu</Text>
          <Image source={logoImg} style={styles.modalImage} />
          <Text>Buffalo Wings [R150]</Text>
          <Text>Buffalo wings, deep-fried unbreaded Buffalo wings or drumsticks coated with a vinegar-and-cayenne-pepper hot sauce mixed with butter.</Text>
          <TouchableOpacity style={styles.button} onPress={() => setStartersModalVisible(false)}>
            <Text style={styles.buttonText}>Back to Menu List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setCheckoutModalVisible(true)}>
            <Text style={styles.buttonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Main Dish Modal */}
      <Modal 
        visible={isMainDishModalVisible} 
        onRequestClose={() => setMainDishModalVisible(false)}
        animationType='slide'
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Main Dish Menu</Text>
          <Image source={maindish} style={styles.modalImage} />
          <Text>Chicken Tikka Masala [R320]</Text>
          <Text>Chicken tikka masala is a dish consisting of roasted marinated chicken chunks (chicken tikka) in a spiced sauce. The sauce is usually creamy and orange-coloured.</Text>
          <TouchableOpacity style={styles.button} onPress={() => setMainDishModalVisible(false)}>
            <Text style={styles.buttonText}>Back to Menu List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setCheckoutModalVisible(true)}>
            <Text style={styles.buttonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Dessert Modal */}
      <Modal 
        visible={isDessertModalVisible} 
        onRequestClose={() => setDessertModalVisible(false)}
        animationType='slide'
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Dessert Menu</Text>
          <Image source={Dessert} style={styles.modalImage} />
          <Text>Red velvet cake [R110]</Text>
          <Text>Red velvet cake is traditionally a red, red-brown, crimson, or scarlet-colored layer cake, layered with ermine icing.</Text>
          <TouchableOpacity style={styles.button} onPress={() => setDessertModalVisible(false)}>
            <Text style={styles.buttonText}>Back to Menu List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setCheckoutModalVisible(true)}>
            <Text style={styles.buttonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a9a9a9',
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  Menutitle: {
    paddingTop: 40,
    fontWeight: 'bold',
    color: 'yellow',
    fontSize: 30,
    textAlign: 'left',
  },
  countText: {
    fontSize: 16,
    color: 'black',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 10,
    paddingVertical: 10,
    width: '100%',
  },
  button: {
    backgroundColor: 'grey',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#deb887',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 20,
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    color: 'Black',
    marginBottom: 20,
  },
  modalImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    width: '80%',
    borderRadius: 5,
  },
  menuList: {
    marginVertical: 10,
  },
  menuItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  menuItemText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
  picker: {
    height: 50,
    width: '80%',
    marginBottom: 10,
  },
});
