import React, { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import {
  Days,
  fetchDays,
  fetchLinks,
  fetchTags,
  Link,
  StoreData,
  Tag,
} from "./controller.add";
import LocationPicker from "../../../../components/Admin_components/LocationPicker/LocationPicker";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import AdminHeader from "../../../../components/Admin_components/AdminHeader/AdminHeader";
import "./Add.css";
const Add: React.FC = () => {
  const [isActive, setIsActive] = useState<string>("store-info"); // State to track active section
  // Refs for scrolling to sections (if needed)
  const storeInfoRef = useRef<HTMLDivElement>(null);
  const storeAddressRef = useRef<HTMLDivElement>(null);
  // Add refs for other sections as needed

  const {
    register,
    handleSubmit,
    control,
    setValue,
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
  const [links, setLinks] = useState<Link[]>([]);
  const [days, setDays] = useState<Days[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    const loadLinksAndDaysAndTags = async () => {
      const linksData = await fetchLinks();
      setLinks(linksData);

      const daysData = await fetchDays();
      setDays(daysData);

      const tagsData = await fetchTags();
      setTags(tagsData);
    };

    loadLinksAndDaysAndTags();
  }, []);
  const handleLocationSelect = (location: any, index: number) => {
    setValue(
      `StoreOpeningDaysAndLocation.${index}.fineLocation.address`,
      location.address
    );
    setValue(
      `StoreOpeningDaysAndLocation.${index}.fineLocation.lattitude`,
      location.lat
    );
    setValue(
      `StoreOpeningDaysAndLocation.${index}.fineLocation.longtiude`,
      location.lng
    );
  };
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
  const scrollToStoreInfo = () => {
    setIsActive("store-info");
    // If scrolling to section is needed, use refs here
  };

  const scrollToStoreAddress = () => {
    setIsActive("store-address");
    // If scrolling to section is needed, use refs here
  };

  //
  return (
    <>
      <AdminHeader />
      <Container className="add-container">
        <h1>Add Store</h1>
        <Nav variant="tabs" defaultActiveKey="#store-info">
          <Nav.Item>
            <Nav.Link href="#store-info" onClick={scrollToStoreInfo}>
              Store Info
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#store-address" onClick={scrollToStoreAddress}>
              Store Address
            </Nav.Link>
          </Nav.Item>
          {/* Add Nav links for other sections */}
        </Nav>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Store Info Section */}
          <section id="store-info">
            {/* Static Fields */}
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                className="form-control"
                id="name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="about">
                About
              </label>
              <input
                className="form-control"
                id="about"
                {...register("about", { required: true })}
              />
              {errors.about && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            {/* Dynamic Store Links */}
            <div className="mb-3">
              <h3>Store Links</h3>
              {storeLinkFields.map((field, index) => (
                <div key={field.id}>
                  <label
                    className="form-label"
                    htmlFor={`storeLinks.${index}.link`}
                  >
                    Link
                  </label>
                  <input
                    className="form-control"
                    id={`storeLinks.${index}.link`}
                    {...register(`storeLinks.${index}.link`, {
                      required: true,
                    })}
                  />
                  {errors.storeLinks?.[index]?.link && (
                    <span className="text-danger">This field is required</span>
                  )}

                  <label
                    className="form-label"
                    htmlFor={`storeLinks.${index}.linkType`}
                  >
                    Link Type
                  </label>
                  <select
                    className="form-select"
                    id={`storeLinks.${index}.linkType`}
                    {...register(`storeLinks.${index}.linkType`, {
                      required: true,
                    })}
                  >
                    {links.map((link) => (
                      <option key={link.linkTypeId} value={link.linkTypeId}>
                        {link.linkTypeName}
                      </option>
                    ))}
                  </select>
                  {errors.storeLinks?.[index]?.linkType && (
                    <span className="text-danger">This field is required</span>
                  )}

                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => removeStoreLink(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  appendStoreLink({
                    link: "",
                    linkType: links[0]?.linkTypeId || 1,
                  })
                }
              >
                Add Store Link
              </Button>
            </div>
            {/* Dynamic Products */}
            <div className="mb-3">
              <h3>Products</h3>
              {productFields.map((field, index) => (
                <div key={field.id}>
                  <label
                    className="form-label"
                    htmlFor={`products.${index}.name`}
                  >
                    Product Name
                  </label>
                  <input
                    className="form-control"
                    id={`products.${index}.name`}
                    {...register(`products.${index}.name`, { required: true })}
                  />
                  {errors.products?.[index]?.name && (
                    <span className="text-danger">This field is required</span>
                  )}

                  <label
                    className="form-label"
                    htmlFor={`products.${index}.price`}
                  >
                    Product Price
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    id={`products.${index}.price`}
                    {...register(`products.${index}.price`, { required: true })}
                  />
                  {errors.products?.[index]?.price && (
                    <span className="text-danger">This field is required</span>
                  )}

                  <Button
                    variant="danger"
                    type="button"
                    onClick={() => removeProduct(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => appendProduct({ name: "", price: 0 })}
              >
                Add Product
              </Button>
            </div>
            {/* Dynamic Instagram Photos */}
            <div className="mb-3">
              <h3>Instagram Photos</h3>
              {instagramPhotoFields.map((field, index) => (
                <div key={field.id}>
                  <label
                    className="form-label"
                    htmlFor={`instagramPhotos.${index}.photoUrl`}
                  >
                    Photo URL
                  </label>
                  <input
                    className="form-control"
                    id={`instagramPhotos.${index}.photoUrl`}
                    {...register(`instagramPhotos.${index}.photoUrl`, {
                      required: true,
                    })}
                  />
                  {errors.instagramPhotos?.[index]?.photoUrl && (
                    <span className="text-danger">This field is required</span>
                  )}

                  <Button
                    variant="danger"
                    type="button"
                    onClick={() => removeInstagramPhoto(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => appendInstagramPhoto({ photoUrl: "" })}
              >
                Add Instagram Photo
              </Button>
            </div>
            {/* Dynamic Store Tags */}
            <div className="mb-3">
              <h3>Store Tags</h3>
              {storeTagFields.map((field, index) => (
                <div key={field.id}>
                  <label
                    className="form-label"
                    htmlFor={`storeTags.${index}.storeTagId`}
                  >
                    Store Tag ID
                  </label>
                  <input
                    className="form-control"
                    id={`storeTags.${index}.storeTagId`}
                    {...register(`storeTags.${index}.storeTagId`, {
                      required: true,
                    })}
                  />
                  {errors.storeTags?.[index]?.storeTagId && (
                    <span className="text-danger">This field is required</span>
                  )}

                  <label
                    className="form-label"
                    htmlFor={`storeTags.${index}.storeId`}
                  >
                    Store ID
                  </label>
                  <input
                    className="form-control"
                    id={`storeTags.${index}.storeId`}
                    {...register(`storeTags.${index}.storeId`, {
                      required: true,
                    })}
                  />
                  {errors.storeTags?.[index]?.storeId && (
                    <span className="text-danger">This field is required</span>
                  )}

                  <label
                    className="form-label"
                    htmlFor={`storeTags.${index}.tagId`}
                  >
                    Tag
                  </label>
                  <select
                    className="form-select"
                    id={`storeTags.${index}.tagId`}
                    {...register(`storeTags.${index}.tagId`, {
                      required: true,
                    })}
                  >
                    {tags.map((tag) => (
                      <option key={tag.tagId} value={tag.tagId}>
                        {tag.tagName}
                      </option>
                    ))}
                  </select>
                  {errors.storeTags?.[index]?.tagId && (
                    <span className="text-danger">This field is required</span>
                  )}

                  <Button
                    variant="danger"
                    type="button"
                    onClick={() => removeStoreTag(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  appendStoreTag({ storeTagId: 0, storeId: 0, tagId: 1 })
                }
              >
                Add Store Tag
              </Button>
            </div>
          </section>
          {/* Store Address Section */}
          <section id="store-address">
            {/* Dynamic Store Opening Days and Location */}
            <div className="mb-3">
              <h3>Store Opening Days and Location</h3>
              {storeOpeningDaysFields.map(
                (storeOpeningDay, storeOpeningDayIndex) => (
                  <div key={storeOpeningDay.id}>
                    <label
                      className="form-label"
                      htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.address`}
                    >
                      Fine Location Address
                    </label>
                    <input
                      className="form-control"
                      id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.address`}
                      {...register(
                        `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.address`,
                        { required: true }
                      )}
                    />
                    {errors.StoreOpeningDaysAndLocation?.[storeOpeningDayIndex]
                      ?.fineLocation?.address && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}

                    <label
                      className="form-label"
                      htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.longtiude`}
                    >
                      Longitude
                    </label>
                    <input
                      className="form-control"
                      id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.longtiude`}
                      {...register(
                        `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.longtiude`,
                        { required: true }
                      )}
                    />
                    {errors.StoreOpeningDaysAndLocation?.[storeOpeningDayIndex]
                      ?.fineLocation?.longtiude && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}

                    <label
                      className="form-label"
                      htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.lattitude`}
                    >
                      Latitude
                    </label>
                    <input
                      className="form-control"
                      id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.lattitude`}
                      {...register(
                        `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.lattitude`,
                        { required: true }
                      )}
                    />
                    {errors.StoreOpeningDaysAndLocation?.[storeOpeningDayIndex]
                      ?.fineLocation?.lattitude && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}

                    <label
                      className="form-label"
                      htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.city`}
                    >
                      City
                    </label>
                    <input
                      className="form-control"
                      id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.city`}
                      {...register(
                        `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.city`,
                        { required: true }
                      )}
                    />
                    {errors.StoreOpeningDaysAndLocation?.[storeOpeningDayIndex]
                      ?.fineLocation?.city && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}

                    <label
                      className="form-label"
                      htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.phone_number`}
                    >
                      Phone Number
                    </label>
                    <input
                      className="form-control"
                      id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.phone_number`}
                      {...register(
                        `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.phone_number`,
                        { required: true }
                      )}
                    />
                    {errors.StoreOpeningDaysAndLocation?.[storeOpeningDayIndex]
                      ?.fineLocation?.phone_number && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}

                    <label
                      className="form-label"
                      htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.email`}
                    >
                      Email
                    </label>
                    <input
                      className="form-control"
                      id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.email`}
                      {...register(
                        `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.email`,
                        { required: true }
                      )}
                    />
                    {errors.StoreOpeningDaysAndLocation?.[storeOpeningDayIndex]
                      ?.fineLocation?.email && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                    <LocationPicker
                      onLocationSelect={(location) =>
                        handleLocationSelect(location, storeOpeningDayIndex)
                      }
                    />
                    <div className="mb-3">
                      <h4>Days</h4>
                      <NestedDays
                        control={control}
                        storeOpeningDayIndex={storeOpeningDayIndex}
                        register={register}
                        errors={errors}
                        days={days}
                      />
                    </div>

                    <Button
                      variant="danger"
                      type="button"
                      onClick={() =>
                        removeStoreOpeningDay(storeOpeningDayIndex)
                      }
                    >
                      Remove Store Opening Day
                    </Button>
                  </div>
                )
              )}
              <Button
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
                    days: [
                      {
                        openTime: "",
                        closeTime: "",
                        dayId: days[0]?.dayId || 1,
                      },
                    ],
                  })
                }
              >
                Add Store Opening Day
              </Button>
            </div>
            <Button type="submit">Submit</Button>
          </section>
        </form>
      </Container>
    </>
  );
};

// NestedDays component to handle the nested useFieldArray for days
const NestedDays: React.FC<{
  control: any;
  storeOpeningDayIndex: number;
  register: any;
  errors: any;
  days: Days[];
}> = ({ control, storeOpeningDayIndex, register, errors, days }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days`,
  });

  return (
    <div className="mb-3">
      {fields.map((field, index) => (
        <div key={field.id}>
          <label
            className="form-label"
            htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.openTime`}
          >
            Open Time
          </label>
          <input
            className="form-control"
            id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.openTime`}
            {...register(
              `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.openTime`,
              { required: true }
            )}
          />
          {errors.StoreOpeningDaysAndLocation?.[storeOpeningDayIndex]?.days?.[
            index
          ]?.openTime && (
            <span className="text-danger">This field is required</span>
          )}

          <label
            className="form-label"
            htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.closeTime`}
          >
            Close Time
          </label>
          <input
            className="form-control"
            id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.closeTime`}
            {...register(
              `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.closeTime`,
              { required: true }
            )}
          />
          {errors.StoreOpeningDaysAndLocation?.[storeOpeningDayIndex]?.days?.[
            index
          ]?.closeTime && (
            <span className="text-danger">This field is required</span>
          )}

          <label
            className="form-label"
            htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.dayId`}
          >
            Day
          </label>
          <select
            className="form-select"
            id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.dayId`}
            {...register(
              `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.dayId`,
              { required: true }
            )}
          >
            {days.map((day) => (
              <option key={day.dayId} value={day.dayId}>
                {day.dayName}
              </option>
            ))}
          </select>
          {errors.StoreOpeningDaysAndLocation?.[storeOpeningDayIndex]?.days?.[
            index
          ]?.dayId && (
            <span className="text-danger">This field is required</span>
          )}

          <Button variant="danger" type="button" onClick={() => remove(index)}>
            Remove Day
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={() =>
          append({ openTime: "", closeTime: "", dayId: days[0]?.dayId || 1 })
        }
      >
        Add Day
      </Button>
    </div>
  );
};

export default Add;
