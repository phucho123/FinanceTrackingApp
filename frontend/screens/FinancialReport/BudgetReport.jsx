import React from "react";
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

import ArrowLeftIcon from "../../assets/svg/arrow-left.svg";
import ShoppingIcon from "../../assets/svg/shopping-bag.svg";
import { primaryColor } from "../../styles/global";

export default function BudgetReport({ route, navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.barContainer}>
                <View style={styles.barItem}></View>
                <View style={styles.barItem}></View>
                <View style={[styles.barItem, styles.activeBarItem]}></View>
                <View style={styles.barItem}></View>
            </View>

            <View style={styles.timeContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("HomeTransaction")}>
                    <ArrowLeftIcon width={32} height={32} fill="#fff" />
                </TouchableOpacity>
                <Text
                    style={{
                        color: "rgba(255,255, 255, 0.7)",
                        fontSize: 24,
                        fontWeight: "bold",
                    }}
                >
                    This Month
                </Text>
                <Text style={{ color: primaryColor }}>dfsdfs</Text>
            </View>

            <TouchableWithoutFeedback onPress={() => navigation.navigate("QuoteReport")}>
                <View style={{ flex: 1, justifyContent: "space-around" }}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ color: "#fff", fontSize: 32, fontWeight: "bold" }}>You Spend 💸</Text>
                        <Text style={styles.moneyTotal}>$332</Text>
                    </View>

                    <View style={styles.cartContainer}>
                        <Text style={styles.mainText}>and your biggest spending is from</Text>

                        <View style={styles.categoryContainer}>
                            <View style={styles.iconContainer}>
                                <ShoppingIcon width={24} height={24} fill="#FCAC12" />
                            </View>
                            <Text style={styles.categoryName}>Shopping</Text>
                        </View>

                        <Text style={styles.biggestMoney}>$120</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primaryColor,
        paddingTop: 32,
    },
    barContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 16,
        marginHorizontal: 13,
    },
    barItem: {
        height: 4,
        width: 85,
        backgroundColor: "rgba(255, 255, 255, 0.24)",
        borderRadius: 6,
    },
    activeBarItem: {
        backgroundColor: "#fff",
    },
    timeContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: 32,
    },
    moneyTotal: {
        color: "#ffffff",
        fontSize: 64,
        fontWeight: "bold",
        marginTop: 16,
    },
    cartContainer: {
        backgroundColor: "#fff",
        borderRadius: 24,
        marginHorizontal: 16,
        alignItems: "center",
    },
    mainText: {
        color: "#0d0e0f",
        fontSize: 24,
        fontWeight: "bold",
        width: 200,
    },
    categoryContainer: {
        backgroundColor: "#fbfbfb",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#E3E5E5",
        marginBottom: 10,
        marginTop: 16,
    },
    iconContainer: {
        padding: 5,
        borderRadius: 10,
        backgroundColor: "#FCEED4",
    },
    categoryName: {
        color: "#0d0e0f",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    },
    biggestMoney: {
        color: "#0d0e0f",
        fontSize: 36,
        fontWeight: "bold",
    },
});
