import React from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { StoreData } from "./controller.add";

const Add: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<StoreData>();

  // For storeLinks
  const {
    fields: storeLinkFields,
    append: appendStoreLink,
    remove: removeStoreLink,
  } = useFieldArray({
    control,
    name: "storeLinks",
  });

  // For storeOpeningDays
  const {
    fields: storeOpeningDaysFields,
    append: appendStoreOpeningDay,
    remove: removeStoreOpeningDay,
  } = useFieldArray({
    control,
    name: "storeOpeningDays",
  });

  // For products
  const {
    fields: productFields,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({
    control,
    name: "products",
  });

  // For instagramPhotos
  const {
    fields: instagramPhotoFields,
    append: appendInstagramPhoto,
    remove: removeInstagramPhoto,
  } = useFieldArray({
    control,
    name: "instagramPhotos",
  });

  const onSubmit: SubmitHandler<StoreData> = (data) => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "storeData.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <h1>Add Store</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Static Fields */}
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" {...register("name", { required: true })} />
          {errors.name && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="about">About</label>
          <input id="about" {...register("about", { required: true })} />
          {errors.about && <span>This field is required</span>}
        </div>

        {/* ... other static fields ... */}

        {/* Dynamic Store Links */}
        <div>
          <h3>Store Links</h3>
          {storeLinkFields.map((field, index) => (
            <div key={field.id}>
              <label htmlFor={`storeLinks.${index}.link`}>Link</label>
              <input
                id={`storeLinks.${index}.link`}
                {...register(`storeLinks.${index}.link`, { required: true })}
              />
              {errors.storeLinks?.[index]?.link && (
                <span>This field is required</span>
              )}

              <label htmlFor={`storeLinks.${index}.linkType`}>Link Type</label>
              <input
                id={`storeLinks.${index}.linkType`}
                type="number"
                {...register(`storeLinks.${index}.linkType`, {
                  required: true,
                })}
              />
              {errors.storeLinks?.[index]?.linkType && (
                <span>This field is required</span>
              )}

              <button type="button" onClick={() => removeStoreLink(index)}>
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendStoreLink({ link: "", linkType: 1 })}
          >
            Add Store Link
          </button>
        </div>

        {/* Dynamic Store Opening Days */}
        <div>
          <h3>Store Opening Days</h3>
          {storeOpeningDaysFields.map(
            (storeOpeningDay, storeOpeningDayIndex) => (
              <div key={storeOpeningDay.id}>
                <label
                  htmlFor={`storeOpeningDays.${storeOpeningDayIndex}.fineLocations.address`}
                >
                  Fine Location Address
                </label>
                <input
                  id={`storeOpeningDays.${storeOpeningDayIndex}.fineLocations.address`}
                  {...register(
                    `storeOpeningDays.${storeOpeningDayIndex}.fineLocations.address`,
                    { required: true }
                  )}
                />
                {errors.storeOpeningDays?.[storeOpeningDayIndex]?.fineLocations
                  ?.address && <span>This field is required</span>}

                <label
                  htmlFor={`storeOpeningDays.${storeOpeningDayIndex}.fineLocations.longtiude`}
                >
                  Longitude
                </label>
                <input
                  id={`storeOpeningDays.${storeOpeningDayIndex}.fineLocations.longtiude`}
                  {...register(
                    `storeOpeningDays.${storeOpeningDayIndex}.fineLocations.longtiude`,
                    { required: true }
                  )}
                />
                {errors.storeOpeningDays?.[storeOpeningDayIndex]?.fineLocations
                  ?.longtiude && <span>This field is required</span>}

                <label
                  htmlFor={`storeOpeningDays.${storeOpeningDayIndex}.fineLocations.lattitude`}
                >
                  Latitude
                </label>
                <input
                  id={`storeOpeningDays.${storeOpeningDayIndex}.fineLocations.lattitude`}
                  {...register(
                    `storeOpeningDays.${storeOpeningDayIndex}.fineLocations.lattitude`,
                    { required: true }
                  )}
                />
                {errors.storeOpeningDays?.[storeOpeningDayIndex]?.fineLocations
                  ?.lattitude && <span>This field is required</span>}

                <label
                  htmlFor={`storeOpeningDays.${storeOpeningDayIndex}.fineLocations.city`}
                >
                  City
                </label>
                <input
                  id={`storeOpeningDays.${storeOpeningDayIndex}.fineLocations.city`}
                  {...register(
                    `storeOpeningDays.${storeOpeningDayIndex}.fineLocations.city`,
                    { required: true }
                  )}
                />
                {errors.storeOpeningDays?.[storeOpeningDayIndex]?.fineLocations
                  ?.city && <span>This field is required</span>}

                <label
                  htmlFor={`storeOpeningDays.${storeOpeningDayIndex}.fineLocations.phone_number`}
                >
                  Phone Number
                </label>
                <input
                  id={`storeOpeningDays.${storeOpeningDayIndex}.fineLocations.phone_number`}
                  {...register(
                    `storeOpeningDays.${storeOpeningDayIndex}.fineLocations.phone_number`,
                    { required: true }
                  )}
                />
                {errors.storeOpeningDays?.[storeOpeningDayIndex]?.fineLocations
                  ?.phone_number && <span>This field is required</span>}

                <label
                  htmlFor={`storeOpeningDays.${storeOpeningDayIndex}.fineLocations.email`}
                >
                  Email
                </label>
                <input
                  id={`storeOpeningDays.${storeOpeningDayIndex}.fineLocations.email`}
                  {...register(
                    `storeOpeningDays.${storeOpeningDayIndex}.fineLocations.email`,
                    { required: true }
                  )}
                />
                {errors.storeOpeningDays?.[storeOpeningDayIndex]?.fineLocations
                  ?.email && <span>This field is required</span>}

                <div>
                  <h4>Days</h4>
                  <NestedDays
                    control={control}
                    storeOpeningDayIndex={storeOpeningDayIndex}
                    register={register}
                    errors={errors}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeStoreOpeningDay(storeOpeningDayIndex)}
                >
                  Remove Store Opening Day
                </button>
              </div>
            )
          )}
          <button
            type="button"
            onClick={() =>
              appendStoreOpeningDay({
                fineLocations: {
                  address: "",
                  longtiude: "",
                  lattitude: "",
                  city: "",
                  phone_number: "",
                  email: "",
                },
                days: [{ openTime: "", closeTime: "", day: { name: "" } }],
              })
            }
          >
            Add Store Opening Day
          </button>
        </div>

        {/* Dynamic Products */}
        <div>
          <h3>Products</h3>
          {productFields.map((field, index) => (
            <div key={field.id}>
              <label htmlFor={`products.${index}.name`}>Product Name</label>
              <input
                id={`products.${index}.name`}
                {...register(`products.${index}.name`, { required: true })}
              />
              {errors.products?.[index]?.name && (
                <span>This field is required</span>
              )}

              <label htmlFor={`products.${index}.price`}>Product Price</label>
              <input
                type="number"
                id={`products.${index}.price`}
                {...register(`products.${index}.price`, { required: true })}
              />
              {errors.products?.[index]?.price && (
                <span>This field is required</span>
              )}

              <button type="button" onClick={() => removeProduct(index)}>
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendProduct({ name: "", price: 0 })}
          >
            Add Product
          </button>
        </div>

        {/* Dynamic Instagram Photos */}
        <div>
          <h3>Instagram Photos</h3>
          {instagramPhotoFields.map((field, index) => (
            <div key={field.id}>
              <label htmlFor={`instagramPhotos.${index}.photoUrl`}>
                Photo URL
              </label>
              <input
                id={`instagramPhotos.${index}.photoUrl`}
                {...register(`instagramPhotos.${index}.photoUrl`, {
                  required: true,
                })}
              />
              {errors.instagramPhotos?.[index]?.photoUrl && (
                <span>This field is required</span>
              )}

              <button type="button" onClick={() => removeInstagramPhoto(index)}>
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendInstagramPhoto({ photoUrl: "" })}
          >
            Add Instagram Photo
          </button>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

// NestedDays component to handle the nested useFieldArray for days
const NestedDays: React.FC<{
  control: any;
  storeOpeningDayIndex: number;
  register: any;
  errors: any;
}> = ({ control, storeOpeningDayIndex, register, errors }) => {
  const {
    fields: dayFields,
    append: appendDay,
    remove: removeDay,
  } = useFieldArray({
    control,
    name: `storeOpeningDays.${storeOpeningDayIndex}.days`,
  });

  return (
    <div>
      {dayFields.map((field, index) => (
        <div key={field.id}>
          <label
            htmlFor={`storeOpeningDays.${storeOpeningDayIndex}.days.${index}.openTime`}
          >
            Open Time
          </label>
          <input
            id={`storeOpeningDays.${storeOpeningDayIndex}.days.${index}.openTime`}
            {...register(
              `storeOpeningDays.${storeOpeningDayIndex}.days.${index}.openTime`,
              { required: true }
            )}
          />
          {errors.storeOpeningDays?.[storeOpeningDayIndex]?.days?.[index]
            ?.openTime && <span>This field is required</span>}

          <label
            htmlFor={`storeOpeningDays.${storeOpeningDayIndex}.days.${index}.closeTime`}
          >
            Close Time
          </label>
          <input
            id={`storeOpeningDays.${storeOpeningDayIndex}.days.${index}.closeTime`}
            {...register(
              `storeOpeningDays.${storeOpeningDayIndex}.days.${index}.closeTime`,
              { required: true }
            )}
          />
          {errors.storeOpeningDays?.[storeOpeningDayIndex]?.days?.[index]
            ?.closeTime && <span>This field is required</span>}

          <label
            htmlFor={`storeOpeningDays.${storeOpeningDayIndex}.days.${index}.day.name`}
          >
            Day Name
          </label>
          <input
            id={`storeOpeningDays.${storeOpeningDayIndex}.days.${index}.day.name`}
            {...register(
              `storeOpeningDays.${storeOpeningDayIndex}.days.${index}.day.name`,
              { required: true }
            )}
          />
          {errors.storeOpeningDays?.[storeOpeningDayIndex]?.days?.[index]?.day
            ?.name && <span>This field is required</span>}

          <button type="button" onClick={() => removeDay(index)}>
            Remove Day
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          appendDay({ openTime: "", closeTime: "", day: { name: "" } })
        }
      >
        Add Day
      </button>
    </div>
  );
};

export default Add;
