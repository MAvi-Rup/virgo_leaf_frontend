import { toast } from "vue3-toastify";

const addItem = (items) => {
    items.push({ accessory: "", unit: 1 });
};

const removeItem = (items, index) => {
    if(items.length >1){
        items.splice(index, 1);
    }else{
        toast.error("You have to add atleast 1 item.")
    }
};

const handleAccessoryChange = (items, index, value) => {
    items[index].accessory = value;
};

const handleUnitChange = (items, index, value) => {
    items[index].unit = value;
};

export { addItem, removeItem, handleAccessoryChange, handleUnitChange };
