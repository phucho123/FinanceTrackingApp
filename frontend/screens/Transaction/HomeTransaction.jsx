import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

import ArrowDownIcon from "../../assets/svg/arrow-down-2.svg";
import ArrowRightIcon from "../../assets/svg/arrow-right-2.svg";
import FilterIcon from "../../assets/svg/sort.svg";
import { primaryColor } from "../../styles/global";

import MainButton from "../../components/button/MainButton";
import TransactionItem from "../../components/TransactionItem";
import axios from "axios";
import { apiBaseUrl } from "../../config";
import { GlobalContext } from "../../context/GlobalContext";
import { useState, useContext, useEffect } from "react";

export default function HomeTransaction({ navigation }) {
    const [filterModal, setFilterModal] = useState(false);
    const [transactions, setTransactions] = useState();

    const { user, setLoading, callTransactions, setCallTransactions } = useContext(GlobalContext);

    const getTransactions = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiBaseUrl}/transactions?userId=${user._id}`);
            if (response.status === 200) {
                setTransactions(response.data);
                setLoading(false);
            } else {
                console.log("Error:", response.data.message);
                setError(response.data.message || "Get Transactions failed");
            }
        } catch (error) {
            console.log("Error details:", error.response ? error.response.data : error.message);
            setLoading(false);
            setError(error.response ? error.response.data.message : "An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        getTransactions();
    }, [callTransactions]);

    return (
        <View style={styles.container}>
            {/* Filter Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={filterModal}
                onRequestClose={() => {
                    console.log("Modal has been closed.");
                    setFilterModal((prev) => !prev);
                }}
            >
                <View style={styles.filterModal}>
                    <View style={styles.filterCart}>
                        <View style={styles.flexRowBetween}>
                            <Text style={styles.section}>Filter Transaction</Text>
                            <TouchableOpacity>
                                <Text style={styles.resetBtn}>Reset</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 16 }}>
                            <Text style={styles.section}>Filter By</Text>
                            <View style={[styles.flexRowBetween, { marginTop: 10 }]}>
                                <TouchableOpacity>
                                    <Text style={styles.selectItem}>Income</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={styles.selectItem}>Expense</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={styles.selectItem}>Transfer</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ marginTop: 16 }}>
                            <Text style={styles.section}>Sort By</Text>
                            <View style={[styles.flexRowBetween, { marginTop: 10 }]}>
                                <TouchableOpacity>
                                    <Text style={styles.selectItem}>Highest</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={styles.selectItem}>Lowest</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={styles.selectItem}>Newest</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ marginTop: 16 }}>
                            <Text style={styles.section}>Category</Text>
                            <View style={styles.flexRowBetween}>
                                <Text>Choose Category</Text>
                                <TouchableOpacity>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Text>0 Selected</Text>
                                        <ArrowRightIcon fill={primaryColor} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.applyBtn}>
                            <MainButton
                                buttonSize="large"
                                buttonType="primary"
                                textType="primaryText"
                                title="Apply"
                                pressHandler={() => {
                                    setFilterModal(false);
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.flexRowBetween}>
                <TouchableOpacity>
                    <View style={[styles.timeSelector, styles.flexRowBetween]}>
                        <ArrowDownIcon width={24} height={24} fill={primaryColor} />
                        <Text style={{ marginLeft: 5, fontSize: 14, fontWeight: "bold" }}>Month</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilterModal(true)}>
                    <View style={styles.filterBtn}>
                        <FilterIcon width={24} height={24} fill="#000" />
                    </View>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("ExpenseReport")}>
                <View style={[styles.reportBtn, styles.flexRowBetween]}>
                    <Text style={{ color: primaryColor, fontSize: 16 }}>See your financial report</Text>
                    <ArrowRightIcon fill={primaryColor} />
                </View>
            </TouchableOpacity>

            <View>
                <Text style={{ fontSize: 18, fontWeight: "medium" }}>Today</Text>
                {transactions &&
                    transactions.map((transaction) => {
                        return (
                            <TransactionItem
                                prevScreen="HomeTransaction"
                                transaction={transaction}
                                navigation={navigation}
                            />
                        );
                    })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
    },
    flexRowBetween: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    timeSelector: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 32,
    },
    filterBtn: {
        padding: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
    },
    reportBtn: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#EEE5FF",
        justifyContent: "space-between",
        marginVertical: 18,
        borderRadius: 10,
    },
    filterModal: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.16)",
    },
    filterCart: {
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingTop: 24,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    section: {
        fontSize: 16,
        color: "#000",
        fontWeight: "bold",
    },
    resetBtn: {
        paddingVertical: 5,
        paddingHorizontal: 12,
        backgroundColor: "#EEE5FF",
        borderRadius: 15,
        color: primaryColor,
    },
    selectItem: {
        borderWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 16,
    },
    applyBtn: {
        alignItems: "center",
        marginVertical: 18,
    },
});
