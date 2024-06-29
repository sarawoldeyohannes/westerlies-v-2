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

  // For StoreOpeningDaysAndLocation
  const {
    fields: storeOpeningDaysFields,
    append: appendStoreOpeningDay,
    remove: removeStoreOpeningDay,
  } = useFieldArray({
    control,
    name: "StoreOpeningDaysAndLocation",
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

  // For storeTags
  const {
    fields: storeTagFields,
    append: appendStoreTag,
    remove: removeStoreTag,
  } = useFieldArray({
    control,
    name: "storeTags",
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

        {/* Dynamic Store Opening Days and Location */}
        <div>
          <h3>Store Opening Days and Location</h3>
          {storeOpeningDaysFields.map(
            (storeOpeningDay, storeOpeningDayIndex) => (
              <div key={storeOpeningDay.id}>
                <label
                  htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.address`}
                >
                  Fine Location Address
                </label>
                <input
                  id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.address`}
                  {...register(
                    `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.address`,
                    { required: true }
                  )}
                />
                {errors.StoreOpeningDaysAndLocation?.[storeOpeningDayIndex]
                  ?.fineLocation?.address && (
                  <span>This field is required</span>
                )}

                <label
                  htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.longtiude`}
                >
                  Longitude
                </label>
                <input
                  id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.longtiude`}
                  {...register(
                    `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.longtiude`,
                    { required: true }
                  )}
                />
                {errors.StoreOpeningDaysAndLocation?.[storeOpeningDayIndex]
                  ?.fineLocation?.longtiude && (
                  <span>This field is required</span>
                )}

                <label
                  htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.lattitude`}
                >
                  Latitude
                </label>
                <input
                  id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.lattitude`}
                  {...register(
                    `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.lattitude`,
                    { required: true }
                  )}
                />
                {errors.StoreOpeningDaysAndLocation?.[storeOpeningDayIndex]
                  ?.fineLocation?.lattitude && (
                  <span>This field is required</span>
                )}

                <label
                  htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.city`}
                >
                  City
                </label>
                <input
                  id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.city`}
                  {...register(
                    `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.city`,
                    { required: true }
                  )}
                />
                {errors.StoreOpeningDaysAndLocation?.[storeOpeningDayIndex]
                  ?.fineLocation?.city && <span>This field is required</span>}

                <label
                  htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.phone_number`}
                >
                  Phone Number
                </label>
                <input
                  id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.phone_number`}
                  {...register(
                    `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.phone_number`,
                    { required: true }
                  )}
                />
                {errors.StoreOpeningDaysAndLocation?.[storeOpeningDayIndex]
                  ?.fineLocation?.phone_number && (
                  <span>This field is required</span>
                )}

                <label
                  htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.email`}
                >
                  Email
                </label>
                <input
                  id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.email`}
                  {...register(
                    `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.email`,
                    { required: true }
                  )}
                />
                {errors.StoreOpeningDaysAndLocation?.[storeOpeningDayIndex]
                  ?.fineLocation?.email && <span>This field is required</span>}

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
                fineLocation: {
                  address: "",
                  longtiude: "",
                  lattitude: "",
                  city: "",
                  phone_number: "",
                  email: "",
                },
                days: [{ openTime: "", closeTime: "", dayId: 1 }],
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

        {/* Dynamic Store Tags */}
        <div>
          <h3>Store Tags</h3>
          {storeTagFields.map((field, index) => (
            <div key={field.id}>
              <label htmlFor={`storeTags.${index}.storeTagId`}>
                Store Tag ID
              </label>
              <input
                id={`storeTags.${index}.storeTagId`}
                {...register(`storeTags.${index}.storeTagId`, {
                  required: true,
                })}
              />
              {errors.storeTags?.[index]?.storeTagId && (
                <span>This field is required</span>
              )}

              <label htmlFor={`storeTags.${index}.storeId`}>Store ID</label>
              <input
                id={`storeTags.${index}.storeId`}
                {...register(`storeTags.${index}.storeId`, { required: true })}
              />
              {errors.storeTags?.[index]?.storeId && (
                <span>This field is required</span>
              )}

              <label htmlFor={`storeTags.${index}.tagId`}>Tag ID</label>
              <input
                id={`storeTags.${index}.tagId`}
                {...register(`storeTags.${index}.tagId`, { required: true })}
              />
              {errors.storeTags?.[index]?.tagId && (
                <span>This field is required</span>
              )}

              <button type="button" onClick={() => removeStoreTag(index)}>
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              appendStoreTag({ storeTagId: 0, storeId: 0, tagId: 1 })
            }
          >
            Add Store Tag
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
  const { fields, append, remove } = useFieldArray({
    control,
    name: `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days`,
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id}>
          <label
            htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.openTime`}
          >
            Open Time
          </label>
          <input
            id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.openTime`}
            {...register(
              `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.openTime`,
              { required: true }
            )}
          />
          {errors.StoreOpeningDaysAndLocation?.[storeOpeningDayIndex]?.days?.[
            index
          ]?.openTime && <span>This field is required</span>}

          <label
            htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.closeTime`}
          >
            Close Time
          </label>
          <input
            id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.closeTime`}
            {...register(
              `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.closeTime`,
              { required: true }
            )}
          />
          {errors.StoreOpeningDaysAndLocation?.[storeOpeningDayIndex]?.days?.[
            index
          ]?.closeTime && <span>This field is required</span>}

          <label
            htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.dayId`}
          >
            Day ID
          </label>
          <input
            id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.dayId`}
            type="number"
            {...register(
              `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.dayId`,
              { required: true }
            )}
          />
          {errors.StoreOpeningDaysAndLocation?.[storeOpeningDayIndex]?.days?.[
            index
          ]?.dayId && <span>This field is required</span>}

          <button type="button" onClick={() => remove(index)}>
            Remove Day
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ openTime: "", closeTime: "", dayId: 1 })}
      >
        Add Day
      </button>
    </div>
  );
};

export default Add;
