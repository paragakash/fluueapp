import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, View, useWindowDimensions, TouchableOpacity, Pressable } from 'react-native'
import { Block, Button, Input, Text } from '../../components'

//import DatePicker from 'react-native-modern-datepicker';
import { theme } from '../../constants';
import BottomModal from '../../components/BottomModal';
import Icon from 'react-native-vector-icons/Ionicons';
//import * as ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import AwesomeAlert from 'react-native-awesome-alerts'




const SignUpForm1 = () => {
    const { width, height } = useWindowDimensions()
    const [showPopover, setShowPopover] = useState(false);
    const [renderMaodelOption, setrenderMaodelOption] = useState('')

    const [educationOptions, seteducationOptions] = useState(["Graduation", "Masters", "M-TECH", "B-TECH", "B.E", "B.AD", "MBA"])
    const [searchEducationOptions, setsearchEducationOptions] = useState(["Graduation", "Masters", "M-TECH", "B-TECH", "B.E", "B.AD", "MBA"])

    const [occupationOption, setoccupationOption] = useState(["Employee", "Bussiness", "Doctor", "Teacher"])
    const [searchOccupationOptions, setsearchOccupationOptions] = useState(["Employee", "Bussiness", "Doctor", "Teacher"])


    const [showAlert, setshowAlert] = useState({ title: "", msg: "", showCancelButton: false, cancelButtonColor: "", cancelText: "cancel", showConfirmButton: true, confirmText: "Done", confirmButtonColor: "", showProgress: "", show: false, onConfirmPressed: () => { }, onCancelPressed: () => { }, customView: null })




    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const displayDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('/');
    }

    //formatDate(new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toString())

    const [selectedDate, setSelectedDate] = useState('');

    const [userData, setuserData] = useState({})

    const [isOpen, setisOpen] = useState(false)





    const addUser = async (postData) => {
        return firestore()
            .collection('users')
            .doc()
            .set(postData)
            .catch(err => err)
    }




    //console.log(formatDate(getDateFronEghtinYearAgo))

    // const toggleAlert = () =>{
    //     var show = !showAlert.show

    // } 
    const onSave = async () => {
        // setshowAlert({ ...showAlert, show: true, title: 'hallow', msg: 'abcdda msg', onConfirmPressed: () => setshowAlert({ ...showAlert, show: false }) })
        try {
            console.log("userData", userData, selectedDate)
            var postData = { ...userData, DOB: selectedDate }
            if (await addUser(postData) == null) {
                Alert.alert("Saved")
            }
        }
        catch (err) { console.log(err) }

    }

    // const renderAlert = ({title, msg, showCancelButton, cancelButtonColor, cancelText, showConfirmButton, confirmText, confirmButtonColor, showProgress, show, onConfirmPressed, onCancelPressed, customView}) => {
    //     return <AwesomeAlert
    //         show={show}
    //         showProgress={showProgress ? showProgress : false}
    //         title={title}
    //         message={msg}
    //         closeOnTouchOutside={false}
    //         closeOnHardwareBackPress={false}
    //         showCancelButton={showCancelButton ? showCancelButton : false}
    //         showConfirmButton={showConfirmButton ? showConfirmButton : true}
    //         cancelText={cancelText}
    //         confirmText={confirmText}
    //         confirmButtonColor={confirmButtonColor ? confirmButtonColor : theme.colors.primary}
    //         cancelButtonColor={cancelButtonColor ? cancelButtonColor : theme.colors.gray}
    //         onCancelPressed={onCancelPressed}
    //         onConfirmPressed={onConfirmPressed}
    //         customView={customView}
    //     />
    // }

    const hndleSetDate=(date)=>{
        setSelectedDate(date ? formatDate(date.toString()) : formatDate(new Date()))
        calculateAge(date)
    }

    const renderDatepickerComponent = () => {
        return <>
            <Block flex={false} padding={[20, 15]} center middle >
                <DatePicker
                    date={selectedDate !== "" ? new Date(selectedDate) : selectedDate}
                    mode={'date'}
                    style={{ width: width * 0.9 }}
                    onDateChange={date => hndleSetDate(date)}
                />
            </Block>
            <Block center margin={[15, 0, 0, 0]}>
                <Pressable onPress={() => setisOpen(false)} >
                    <Icon name={'ios-checkmark-circle-sharp'} color={theme.colors.primary} size={40} />
                </Pressable>
            </Block>
        </>
    }





    const onSearchEductionOption = (e) => {
        let filterData = educationOptions.map(i => i.toLowerCase()).filter(item => item.includes(e));
        setsearchEducationOptions(filterData)
        setuserData({ ...userData, Education: e })
    }

    const oneducationOptionPressd = (e) => {
        setuserData({ ...userData, Education: e })
        setisOpen(false)
    }

    const onSearchOccupationOption = (e) => {
        let filterData = occupationOption.map(i => i.toLowerCase()).filter(item => item.includes(e));
        setsearchEducationOptions(filterData)
        setuserData({ ...userData, Occupation: e })
    }

    const onOccupationOptionPressd = (e) => {
        setuserData({ ...userData, Occupation: e })
        setisOpen(false)
    }

    const calculateAge = (date) => { // birthday is a date
        let date1 = new Date(date);
        let date2 = new Date();
        let yearsDiff = date2.getFullYear() - date1.getFullYear();
        setuserData({ ...userData,age:yearsDiff})
        //return yearsDiff;
    }


    const setRenderComponent = (name) => {
        setrenderMaodelOption(name)
        setisOpen(true)
        setsearchEducationOptions(educationOptions)
        setsearchOccupationOptions(occupationOption)
        if (selectedDate == '') {
            setSelectedDate(formatDate(new Date(new Date().setFullYear(new Date().getFullYear() - Number(userData.age ? userData.age : 18))).toString()))
        }
    }

    const renderEducationPickerComponent = () => {
        return <Block flex={false} padding={[5, 5]}  >
            <Block flex={false} row>
                <Block flex={0.9} padding={[0, 0, 5, 0]}>
                    <Input placeholder="Search / Add Education" value={userData.Education} onChangeText={(e) => onSearchEductionOption(e)} />
                </Block>
                <Block center middle flex={0.1}>
                    <Pressable onPress={() => setisOpen(false)}>
                        <Icon name={'add-circle'} size={40} color={theme.colors.primary} />
                    </Pressable>

                </Block>
            </Block>
            <Block flex={false}   >
                <OptimizedFlatList
                    data={searchEducationOptions}
                    keyExtractor={(item, index) => `item-${index}`}
                    style={{ height: '75%' }}
                    renderItem={({ item }) => <Pressable onPress={() => oneducationOptionPressd(item)}><Block flex={false} padding={[15, 5]} borderBottom ><Text>{item}</Text></Block></Pressable>}
                />
            </Block>
        </Block>
    }

    const renderOccumpationPickerComponent = () => {
        return <Block flex={false} padding={[5, 5]}  >
            <Block flex={false} row>
                <Block flex={0.9} padding={[0, 0, 5, 0]}>
                    <Input placeholder="Search / Add Occupetion" value={userData.Occupation} onChangeText={(e) => onSearchOccupationOption(e)} />
                </Block>
                <Block center middle flex={0.1}>
                    <Pressable onPress={() => setisOpen(false)}>
                        <Icon name={'add-circle'} size={40} color={theme.colors.primary} />
                    </Pressable>

                </Block>
            </Block>
            <Block flex={false}   >
                <OptimizedFlatList
                    data={searchOccupationOptions}
                    keyExtractor={(item, index) => `item-${index}`}
                    style={{ height: '75%' }}
                    renderItem={({ item }) => <Pressable onPress={() => onOccupationOptionPressd(item)}><Block flex={false} padding={[15, 5]} borderBottom ><Text>{item}</Text></Block></Pressable>}
                />
            </Block>
        </Block>
    }

    console.log("userDat", userData.Education)

    const handleAge=(e)=>{
        setuserData({ ...userData, age: e })
        setSelectedDate(formatDate(new Date(new Date().setFullYear(new Date().getFullYear() - Number(e))).toString()))        
    }


    return (
        <>
            {/* {showAlert.show &&  renderAlert(showAlert)} */}
            {
                <BottomModal isOpen={isOpen} resetState={(e) => setisOpen(e)} modalHeight={height * 0.35} >
                    {renderMaodelOption == "education" ? renderEducationPickerComponent() : null}
                    {renderMaodelOption == "datepicker" ? renderDatepickerComponent() : null}
                    {renderMaodelOption == "occupation" ? renderOccumpationPickerComponent() : null}
                </BottomModal>
            }
            <Block flex={0.8} >
                <TouchableOpacity onPress={() => launchCamera()}>
                    <Text uppercase style={{ marginLeft: 5 }}>Enter Your Name</Text>
                </TouchableOpacity>
                <Input placeholder="Enter Your First Name" onChangeText={(e) => setuserData({ ...userData, firstName: e })} />
                <Input placeholder="Enter Your Last Name" onChangeText={(e) => setuserData({ ...userData, lastName: e })} />
                <Block flex={false} margin={[height * 0.01, 0]}>
                    <Text uppercase style={{ marginLeft: 5 }}>Age</Text>
                    <Block flex={false} row>
                        <Block flex={0.4} >
                            <Input number placeholder="Age" onChangeText={(e) => handleAge(e) } />
                        </Block>
                        <Block flex={0.6} >
                            <Pressable onPress={() => setRenderComponent('datepicker')}>
                                <Input number editable={false} value={selectedDate ? displayDate(selectedDate) : null} placeholder="DOB" onChangeText={(e) => setuserData({ ...userData, DOB: e })} />
                            </Pressable>
                        </Block>
                    </Block>
                </Block>
                <View style={{ position: 'relative', }}>
                    <Block flex={false} margin={[height * 0.01, 0]}>
                        <Pressable onPress={() => setRenderComponent('education')}>
                            <Text uppercase style={{ marginLeft: 5 }}>Education</Text>
                            <Input placeholder="Education" value={userData.Education} editable={false} />
                        </Pressable>
                    </Block>
                    {/* <Collapsible collapsed={educationOptions}> */}

                    {/* </Collapsible> */}
                </View>
                <Block flex={false} margin={[height * 0.01, 0]}>
                    <Pressable onPress={() => setRenderComponent('occupation')}>
                        <Text uppercase style={{ marginLeft: 5 }}>Occupation</Text>
                        <Input placeholder="Occupation" value={userData.Occupation} editable={false} />
                    </Pressable>
                </Block>
            </Block>
            <Block flex={0.1}>
                <Button onPress={() => onSave()} color={theme.colors.primary} title={"save"} ></Button>
            </Block>
        </>
    )
}

export default SignUpForm1

const styles = StyleSheet.create({})
