import { useState, useEffect } from "react";

// using local cache to store user's previous animal selection
const localCache = {};

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  // status is a string that represents the state that the hook is in
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      // animal doesn't exist so set to empty
      setBreedList([]);
    } else if (localCache[animal]) {
      // animal exists in the local cache so set the breedlist to the cached data
      setBreedList(localCache[animal]);
    } else {
      // animal exists so search for it with the api
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);
  return [breedList, status];
}
