import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function JoinComplete({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>회원가입이 완료되었습니다.</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.bodyText}>
                    모아 구독에 가입해주셔서 감사합니다.
                </Text>
                <Text style={styles.bodyText}>모아 구독을 더욱 편리하게 이용해보세요.</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.replace('LoginPage')}>
                    <Text style={styles.buttonText}>로그인 하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    body: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyText: {
        fontSize: 15,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#F5F5F5',
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});
