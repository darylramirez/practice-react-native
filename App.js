import * as React from 'react';
import { useState } from 'react';
import {
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
	KeyboardAvoidingView,
	TouchableOpacity,
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from '@firebase/app';

// Basic reusable components

const Avatar = (props) => (
	<Image style={styles.avatar} source={{ uri: props.url }} />
);

const Heading = (props) => <Text style={styles.heading}>{props.children}</Text>;

const Title = (props) => <Text style={styles.title}>{props.children}</Text>;

// App-specific components

const WoofCard = (props) => (
	<View>
		<Avatar url={props.url} style={{ width: 100, height: 100 }} />
		<View style={{ textAlign: 'center' }}>
			<Title>{props.name}</Title>
		</View>
	</View>
);

const woofCardStyles = StyleSheet.create({
	card: { backgroundColor: 'gray', borderRadius: 30 },
	title: { fontSize: 12 },
});

const WoofPost = (props) => (
	<View style={woofPostStyles.layout}>
		<Image style={styles.avatar} source={{ uri: props.url }} />
		<View style={woofPostStyles.content}>
			<Text style={woofPostStyles.title}>{props.title}</Text>
			<Text style={woofPostStyles.description}>{props.description}</Text>
		</View>
	</View>
);

const woofPostStyles = StyleSheet.create({
	layout: {
		alignContent: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	image: {
		flex: 1,
		width: 100,
		height: 100,
		borderRadius: 30,
		margin: 25,
	},
	content: {
		flex: 2,
		padding: 10,
		margin: 10,
	},
	title: {
		padding: 2,
		fontSize: 14,
		fontWeight: 'bold',
		color: 'indigo',
	},
	description: { margin: 2, fontSize: 12 },
});

// The screen rendering everything
const HomeScreen = () => {
	const [value, setValue] = useState('');
	return (
		<View>
			<ScrollView vertical padding={10}>
				<Heading>New Kittens</Heading>
				<ScrollView horizontal>
					<WoofCard name="Malevolent" url="https://placekitten.com/200/287" />
					<WoofCard name="Cat" url="https://placekitten.com/408/287" />
					<WoofCard name="Spencer" url="https://placekitten.com/200/286" />
					<WoofCard name="Bunny" url="https://placekitten.com/200/139" />
					<WoofCard name="Seeth" url="https://placekitten.com/200/140" />
					<WoofCard
						name="Mr.Tux"
						url="https://images.unsplash.com/photo-1606509769472-7660d4a478ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
					/>
				</ScrollView>
				<Heading>Recent Cat Posts</Heading>
				<WoofPost
					title="I quit my job to write about cats"
					description="Why?"
					url="https://images.unsplash.com/photo-1604675223954-b1aabd668078?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
				/>
				<WoofPost
					title="My cat should pay rent"
					description="A thinkpiece"
					url="https://images.unsplash.com/photo-1600880292630-ee8a00403024?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
				/>
				<WoofPost
					title="Cats will take over the world."
					description="An inevitable conclusion"
					url="https://images.unsplash.com/photo-1570114181742-4bab3af44518?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
				/>
				<WoofPost
					title="Cat"
					description="What is a cat?"
					url="https://images.unsplash.com/photo-1526674183561-4bfb419ab4e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60/"
				/>
				<WoofPost
					title="Should you adopt a cat?"
					description="Yes. No need to open the article."
					url="https://images.unsplash.com/photo-1595752776689-aebef37b5d32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
				/>
				<WoofPost
					title="Need one more article for scrolling purposes"
					description="Here we are."
					url="https://images.unsplash.com/photo-1536500152107-01ab1422f932?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
				/>
			</ScrollView>
		</View>
	);
};

const App = () => {
	// Initialize Firebase

	const [value, setValue] = useState('');
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#FAF9FA' }}>
			<NavigationContainer>
				<StackNavigator />
			</NavigationContainer>
			<NavigationContainer></NavigationContainer>
		</SafeAreaView>
	);
};

const Input = (props) => {
	const [value, setValue] = useState({
		email: '',
		password: '',
	});
	const { email, password } = value;
	return (
		<View>
			<Text style={{ marginVertical: 16, padding: 8, fontSize: 18 }}>
				{props.value}
			</Text>
			<TextInput
				style={{ padding: 8, backgroundColor: '#f5f5f5' }}
				placeholder={props.value}
				secureTextEntry={props.secure}
			/>
		</View>
	);
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// --- Main screens ---

// --- Onboarding screens ---

// --- App ---
// export const MainNavigator = () => (
// 	<Tab.Navigator>
// 		<Tab.Screen name="Home" component={HomeScreen} />
// 	</Tab.Navigator>
// );

export const StackNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen name="Sign-In" component={SignInScreen} />
		<Stack.Screen name="Sign-Up" component={SignUpScreen} />
		<Stack.Screen name="Home" component={HomeScreen} />
	</Stack.Navigator>
);

const SignUpScreen = () => {
	const firebaseConfig = {
		apiKey: 'AIzaSyCPYViO_eSgamWDp3sEtASLOPHQMw0vMWY',
		authDomain: 'catnap-459c9.firebaseapp.com',
		projectId: 'catnap-459c9',
		storageBucket: 'catnap-459c9.appspot.com',
		messagingSenderId: '921815350118',
		appId: '1:921815350118:web:cce9d11366ff13c62866a7',
		measurementId: 'G-MFYBFFXB07',
	};

	const [value, setValue] = useState({
		email: '',
		password: '',
	});
	const nav = useNavigation();

	initializeApp(firebaseConfig);

	function handleChange(text, eventName) {
		setValue((prev) => {
			return {
				...prev,
				[eventName]: text,
			};
		});
	}
	function SignUp() {
		const { email, password } = value;
		const auth = getAuth();
		createUserWithEmailAndPassword(email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				//
			});
	}

	return (
		<KeyboardAvoidingView style={styles.layout}>
			<Text style={styles.title}>Sign-Up</Text>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					backgroundColor: '#ecf0f1',
					padding: 10,
				}}>
				<ScrollView>
					<Input
						value="Email"
						onChange={(text) => handleChange(text, 'email')}
					/>
					<Input
						value="Password"
						secure={true}
						onChange={(text) => handleChange(text, 'password')}
					/>
				</ScrollView>
			</View>
			<Button style={styles.button} title="Register" onPress={() => SignUp()} />
			<Text style={styles.title}>Or</Text>
			<Button
				style={styles.button}
				title="Go to Sign-In"
				onPress={() => nav.navigate('Sign-In')}
			/>
		</KeyboardAvoidingView>
	);
};

const SignInScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const nav = useNavigation();
	return (
		<KeyboardAvoidingView style={styles.layout}>
			<ScrollView>
				<Text
					style={{
						textAlign: 'center',
						fontWeight: 'bold',
						fontSize: 24,
					}}>
					CatNap!
				</Text>
				<Text style={styles.title}>Sign-In Here</Text>
				<Input value="Email" />
				<Input value="Password" secure={true} />
				<Button
					title="Log-In"
					onPress={() => nav.navigate('Home')}
					style={styles.button}
				/>
				<Text style={styles.title}>Don't Have an Account Yet?</Text>
				<Button
					style={styles.button}
					title="Go to SignUp"
					onPress={() => nav.navigate('Sign-Up')}
				/>
				<Text style={styles.title}>
					You can also press the button below to browse as a guest.
				</Text>
				<Button
					style={styles.button}
					title="Go to Home Screen"
					onPress={() => nav.navigate('Home')}
				/>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	layout: {
		flex: 1,
		justifyContent: 'center',
		padding: 8,
	},
	title: {
		margin: 24,
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		padding: 8,
		color: 'indigo',
	},
	avatar: {
		flex: 1,
		width: 100,
		height: 100,
		borderRadius: 30,
		margin: 5,
	},
	heading: {
		fontWeight: 'bold',
		fontSize: 20,
		padding: 30,
	},
	button: {
		borderRadius: 15,
		width: '100%',
		padding: 20,
	},
});

export default App;
