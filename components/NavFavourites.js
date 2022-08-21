import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "react-native-elements/dist/icons/Icon";
import tw from "tailwind-react-native-classnames";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const data = [
  {
    id: "1",
    icon: "home",
    location: "Home",
    description: "45a Green Lane, Colombo, Sri Lanka",
    destination: { lat: 6.944023800000001, lng: 79.8629473 },
    // destination: 6.944023800000001,
  },
  {
    id: "2",
    icon: "briefcase",
    location: "Work",
    description: "Surge Global, Rajagiriya Road, Colombo, Sri Lanka",
    destination: { lat: 6.9162243, lng: 79.8963698 },
    // destination: 6.944023800000001,
  },
];

const NavFavourites = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <FlatList
      style={tw`ml-1`}
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
      )}
      renderItem={({ item: { location, destination, icon, description } }) => (
        <TouchableOpacity
          style={tw`flex-row items-center p-5`}
          onPress={() => {
            if (route.name === "Home") {
              dispatch(
                setOrigin({
                  location: destination,
                  description: description,
                })
              );

              dispatch(setDestination(null));
            } else {
              dispatch(
                setDestination({
                  location: destination,
                  description: description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }
          }}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{description}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavourites;
