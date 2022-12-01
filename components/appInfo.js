import { Text, StyleSheet, ScrollView, Image } from 'react-native';
import { theme } from './theme';

export const AppInfo = () => {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: 'white',
        },
        projectTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
            color: 'skyblue',
        },
        projectDescription: {
            fontSize: 14,
            color: '#000',
            fontWeight: '300',
            marginBottom: 10,
        },
        frontPeople: {
            fontSize: 14,
            color: '#000',
            fontWeight: '300',
            marginBottom: 10,
        },
        image: {
            marginTop: 30,
            width: theme.deviceWidth - 40,
            height: theme.deviceWidth - 50,
            resizeMode: 'cover',
            borderRadius: 10,
        },

    });

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.projectTitle}>
                모아 구독 토이 프로젝트
            </Text>
            <Text style={styles.projectDescription}>
                모아 구독 토이 프로젝트는 구독 서비스의 기능을 구현한 토이 프로젝트입니다. 판매자가 등록된 구독상품을 구매자가 월 구독으로 구매가 가능합니다.
            </Text>
            <Text style={styles.frontPeople}>
                - 프론트 엔드: 이민기, 백선진
            </Text>
            <Text style={styles.frontPeople}>
                - 백 엔드: 김선민, 박재현, 고현우, 황영상, 김태인
            </Text>
            <Text style={styles.stack}>
                - 프론트 스택: React Native Expo, Remix
            </Text>
            <Text style={styles.stack}>
                - 백엔드 스택: Node.js, Express, Django, Spring, PostgreSQL, MongoDB, Redis...
            </Text>
            <Image
                style={styles.image}
                source={require('../assets/png.jpg')}
            />
        </ScrollView>
    );
};
