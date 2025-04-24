import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox"; // Make sure you have a Checkbox component

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  const isSelected = selectedId?.id === addressInfo?.id;

  const handleCheckboxChange = () => {
    if (setCurrentSelectedAddress) {
      setCurrentSelectedAddress(addressInfo);
    }
  };

  return (
    <Card
      className={`relative transition-all duration-200 shadow-md rounded-xl ${
        isSelected ? "border- border-red-700 bg-red-50" : "border border-gray-300"
      }`}
    >
      <CardContent className="p-5 space-y-2">
        <div className="flex items-start justify-between">
          <Label className="font-semibold text-lg">Shipping Address</Label>
          <Checkbox
            checked={isSelected}
            onCheckedChange={handleCheckboxChange}
            className="w-5 h-5 text-red-600"
          />
        </div>
        <div className="grid gap-1 text-sm text-gray-700">
          <p><span className="font-medium">Address:</span> {addressInfo?.address}</p>
          <p><span className="font-medium">City:</span> {addressInfo?.city}</p>
          <p><span className="font-medium">Pincode:</span> {addressInfo?.pincode}</p>
          <p><span className="font-medium">Phone:</span> {addressInfo?.phone}</p>
          <p><span className="font-medium">Notes:</span> {addressInfo?.notes}</p>
        </div>
      </CardContent>
      <CardFooter className="px-5 pb-5 flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => handleEditAddress(addressInfo)}
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          onClick={() => handleDeleteAddress(addressInfo)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
