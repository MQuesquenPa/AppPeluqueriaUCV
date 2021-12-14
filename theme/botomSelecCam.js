import { StyleSheet } from "react-native";

export const stylesBottomSheet =  StyleSheet.create({
    panel: {
        padding: 20,
        backgroundColor: '#dddddd',
        paddingTop: 20,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 5,
        shadowOpacity: 0.4,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'black',
        height: 30,
        
    },
    panelButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#5856D6',
        alignItems: 'center',
        marginVertical: 3,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        
    },
})


