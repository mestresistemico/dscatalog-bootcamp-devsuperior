import { StyleSheet } from 'react-native'

const colors = {
    white: "#fff",
    lightGray: "#f2f2f2",
    borderGray: "#e1e1e1",
    mediumGray: "#9e9e9e",
    darkGray: "#263238",
    black: "#000",
    primary: "#407bee",
    secondary: "#33569b",
    bluePill: "#407bff61",
    red: "#df5753",
};

const text = StyleSheet.create({
    bold:{
        fontSize: 32, 
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
        color: colors.darkGray,
    },

    regular:{
        fontSize: 20, 
        fontWeight: "400",
        textAlign: "center",
        color: colors.mediumGray,
    },

    primaryText: {
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 22,
        textAlign: "center",
        color: "#FFFFFF",
        textTransform: "uppercase",
        marginLeft: 20,
    },

    productName: {
        fontSize: 16,
        fontWeight: "bold",       
    },

    currency: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.mediumGray,
    },
    
    productPrice: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors.primary,
    },

    gobackText: {
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: colors.darkGray,
        marginLeft: 16,
    },

    productDetailsText: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 10,
        color: colors.darkGray,
    },

    productDescription: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.mediumGray,
    },
});

const theme = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    card: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.white,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "space-around",
        shadowColor: colors.black,
        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    draw: {
        width: 313,
        height: 225,
    },

    textContainer: {
        paddingHorizontal: 20,

    },
    
    primaryButton: {
        backgroundColor: colors.primary,
        width: 290,
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
    },

    arrowContainer: {
        height: 50,
        width: 50,
        backgroundColor: colors.secondary,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    scrollContainer: {
        padding: 10,
    },

    productCard: {
        width: "100%",
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "space-around",
    },

    productImg: {
        width: 140,
        height: 140,
        margin: 16,
    },

    productDescription: {
        width: "100%",
        padding: 20, 
        borderTopColor: colors.lightGray,
        borderTopWidth: 1,

    },

    priceContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    
    inputContainer: {
        width: "100%",
        height: 60,
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginVertical: 12.5,
        paddingVertical: 10
    },

    searchInput: {
        width: "90%",
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderGray, 
    },

    detailsContainer: {
        backgroundColor: colors.white,
        padding: 20,
    },

    gobackContainer: {
        width: 290,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        justifyContent: "flex-start",
    },

    detailCard: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.white,
        borderRadius: 20,
        justifyContent: "space-around",
        shadowColor: colors.black,
        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        padding: 20,
    },

    productImageContainer: {
        width: "100%",
        borderWidth: 1,
        borderColor: colors.lightGray,
        alignItems: "center",
        borderRadius: 20,
    },

    productImage: {
        width: 220,
        height: 220,
    },

    scrollTextContainer: {
        marginVertical: 20,
        padding: 20,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: colors.lightGray,
    },
});

export {colors, theme, text};