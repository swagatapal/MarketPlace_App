import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Image, ToastAndroid, Alert, ActivityIndicator } from 'react-native'
import { app } from '../../firebase_config';
import { getFirestore, getDocs,collection, addDoc  } from "firebase/firestore";
import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUser } from '@clerk/clerk-expo';




export default function AddPostScreen() {

const db = getFirestore(app);
const storage = getStorage();
const {user} = useUser();
const [categoryList, setCategoryList]=useState([]);
const [image, setImage] = useState(null);
const [loading, setLoading] = useState(false);

useEffect(()=>{
  getCategoryList();  

},[])


// fetch the category list from firebase

const getCategoryList=async ()=>{
  setCategoryList([]); // clear the list whenever 
      const querySnapshot = await getDocs(collection(db, "category"));
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        setCategoryList(categoryList=>[...categoryList,doc.data()]);// store the data in the state
      });
}

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod=async (value)=>{
    // value.image = image;
    // console.log(value);

    //consvert uri to blob file
    setLoading(true);
    const resp = await fetch(image);
    const blob = await resp.blob();
    const storageRef = ref(storage, 'communityPost/'+Date.now()+".jpg"); //
    const metadata = {
      contentType: 'image/jpeg'
    };
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, blob,metadata ).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    }).then((resp)=>{
      getDownloadURL(storageRef).then(async(downloadUrl)=>{
        console.log(downloadUrl);
        value.image = downloadUrl;
        value.userName= user.fullName;
        value.userEmail = user.primaryEmailAddress.emailAddress;
        value.userImage = user.imageUrl;

        const docRef =await addDoc(collection(db, "UserPost"), value);
        if(docRef.id)
        {
          setLoading(false);
          Alert.alert("success!!!!","post added successfully!!!!");
          // console.log("Document added!!");
          // resetForm();
        } 
      });

    });
 




  }

  return (
    <View className='p-10'>
      <Text className='text-[27px] font-bold'>Add New Post</Text>
      <Text className='text-[16px] text-gray-500 mb-7'>Create new post and start selling</Text>
      <Formik initialValues={{title:'', desc:'', category:'',address:'', image:'', price:'', userName:'', userEmail:'', userImage:''}}
      onSubmit={value=>onSubmitMethod(value)}
      validate={(values)=>{
        const errors={};
        if(!values.title)
        {
            console.log("title not present");
            ToastAndroid.show("title must be there", ToastAndroid.SHORT)
            errors.name="title must be there";
        }
        return errors;

      }}
      >

        {({handleChange, handleBlur,handleSubmit,values,setFieldValue, errors})=>(
          <View>
            <TouchableOpacity onPress={pickImage}>
            
            {image ?
            <Image source={{uri:image}} style={{width:100, height:100, borderRadius:15}}/>:
            
            <Image source={require('../../assets/Images/imagePlaceholder.jpg')}
            style={{width:100, height:100, borderRadius:15}}/>}

            </TouchableOpacity>
            

            <TextInput style={styles.input} 
            placeholder='Title'
            value={values?.title} 
            onChangeText={handleChange('title')}/>

            <TextInput style={styles.input} 
            placeholder='Description'
            value={values?.desc}
            numberOfLines={5}
            onChangeText={handleChange('desc')}/>

            <TextInput style={styles.input} 
            placeholder='Price'
            value={values?.price}
            keyboardType='number-pad'
            onChangeText={handleChange('price')}/>

            <TextInput style={styles.input} 
            placeholder='Address'
            value={values?.address}
            onChangeText={handleChange('address')}/>
            <View style={{borderWidth:1, borderRadius:10, marginTop:15}}>
            <Picker
              selectedValue={values?.category}
              style={styles.input}
              onValueChange={itemValue=>setFieldValue('category', itemValue)}
            >
              {categoryList && categoryList.map((item, index) => (
                <Picker.Item key={index} label={item.name} value={item.name} />
              ))}
            </Picker>

            </View>
            


            <TouchableOpacity onPress={handleSubmit} className='p-4  bg-blue-500 rounded-full mt-10'
            style={{
              backgroundColor:loading?'#CCC':'#007BFF'
            }}
            disabled={loading}>
              {
                loading? <ActivityIndicator color='#fff'/>:              <Text className='text-white text-center text-[16px]'>Submit</Text>

              }
            </TouchableOpacity>



            {/* <Button onPress={handleSubmit} title="submit" className="mt-3"/> */}
          </View>
        )}

      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  input:{
    borderWidth:1,
    borderRadius:10,
    padding:10, 
    paddingHorizontal:10,
    fontSize:17,
    marginTop:15,
    marginBottom:5,
    textAlignVertical:'top'
  }
  
})