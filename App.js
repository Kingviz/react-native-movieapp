
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MediaList from './components/MediaList';
import ShowPage from './components/ShowPage';
import Search from './components/Search';


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();


const MoviesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List of Movies"
        component={MediaList}
        initialParams={{ type: 'movie' }}
      />
      <Stack.Screen name="ShowPage" component={ShowPage} />
    </Stack.Navigator>
  );
};


const TVShowsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List of TV Shows "
        component={MediaList}
        initialParams={{ type: 'tv' }}
      />
      <Stack.Screen name="ShowPage" component={ShowPage} />
    </Stack.Navigator>
  );
};

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchPage"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Detail" 
        component={ShowPage} 
        options={{ title: "Details" }} 
      />
    </Stack.Navigator>
  );
}


// const App = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen
//           name="Movies"
//           component={MoviesStack}
//           options={{ title: 'Movies' }}
//         />
//         <Tab.Screen
//           name="TV Shows"
//           component={TVShowsStack}
//           options={{ title: 'TV Shows' }}
//         />
//         <Tab.Screen
//           name="Search"
//           component={SearchStack}
//           options={{ title: 'Search' }}
//         />

// \
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { marginTop: 80 } 
        }}
      >
        <Tab.Screen
          name="Movies"
          component={MoviesStack}
          options={{ title: 'Movies' }}
        />
        <Tab.Screen
          name="TV Shows"
          component={TVShowsStack}
          options={{ title: 'TV Shows' }}
        />
        <Tab.Screen
          name="Search"
          component={SearchStack}
          options={{ title: 'Search' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default App;
