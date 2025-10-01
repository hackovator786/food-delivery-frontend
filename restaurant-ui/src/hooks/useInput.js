// import useLocalStorage from "./useLocalStorage";
import useSessionStorage from "./useSessionStorage.js";

const useInput = (key, initValue) => {
    const [value, setValue] = useSessionStorage(key, initValue);

    const reset = () => setValue(initValue);

    const attributeObj = {
        value,
        onChange: (e) => setValue(e.target.value)
    }

    return [value, reset, attributeObj];
}

export default useInput 