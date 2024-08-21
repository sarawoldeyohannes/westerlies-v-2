import React, { useEffect, useRef, useState } from "react";
import { fetchStoreById, UpdateStore } from "./controller.update";
import {
  Days,
  fetchDays,
  fetchLinks,
  fetchTags,
  Link,
  StoreData,
  Tag,
  uploadFile,
} from "../Add/controller.add";
import LocationPicker from "../../../../components/Admin_components/LocationPicker/LocationPicker";
import "../Add/Add.css";
import { useParams } from "react-router-dom";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import AdminHeader from "../../../../components/Admin_components/AdminHeader/AdminHeader";
import { Container, Button, Row, Col } from "react-bootstrap";

const Update = () => {
  const { id } = useParams<{ id: string }>();
  const [formValues, setFormValues] = useState<StoreData | null>(null); // Initialize with null
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState<Link[]>([]);
  const [days, setDays] = useState<Days[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<StoreData>({
    defaultValues: {
      storeLinks: [],
      StoreOpeningDaysAndLocation: [],
      instagramPhotos: [],
      storeTags: [],
    },
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const errorMessageRef = useRef<HTMLDivElement>(null);
  const handleNext = async () => {
    const isValid = await trigger(); // Trigger validation
    if (isValid) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      // Set error message and scroll to the error message
      setErrorMessage("Please fill out the required fields.");
      if (errorMessageRef.current) {
        errorMessageRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };
  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
  const {
    fields: storeLinkFields,
    append: appendStoreLink,
    remove: removeStoreLink,
  } = useFieldArray({ control, name: "storeLinks" });

  const {
    fields: storeOpeningDaysFields,
    append: appendStoreOpeningDay,
    remove: removeStoreOpeningDay,
  } = useFieldArray({ control, name: "StoreOpeningDaysAndLocation" });

  const {
    fields: instagramPhotoFields,
    append: appendInstagramPhoto,
    remove: removeInstagramPhoto,
  } = useFieldArray({ control, name: "instagramPhotos" });

  const {
    fields: storeTagFields,
    append: appendStoreTag,
    remove: removeStoreTag,
  } = useFieldArray({ control, name: "storeTags" });

  useEffect(() => {
    const loadInitialData = async () => {
      const [linksData, daysData, tagsData] = await Promise.all([
        fetchLinks(),
        fetchDays(),
        fetchTags(),
      ]);
      setLinks(linksData);
      setDays(daysData);
      setTags(tagsData);

      if (id) {
        const response = await fetchStoreById(id);
        const fetchedData = Array.isArray(response.data)
          ? response.data[0]
          : response.data;
        setFormValues(fetchedData);
      }
    };

    loadInitialData();
  }, [id]);

  useEffect(() => {
    if (formValues) {
      Object.keys(formValues).forEach((key) => {
        setValue(key as keyof StoreData, formValues[key as keyof StoreData]);
      });
    }
  }, [
    formValues,
    setValue,
    appendStoreLink,
    appendStoreOpeningDay,
    appendInstagramPhoto,
    appendStoreTag,
  ]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const storePicturePath = await uploadFile(file);
        setValue("storePicture", storePicturePath);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };
  // Helper function to format the picture URL
  const getPictureUrl = (path: string | undefined): string => {
    if (!path) return "";
    // Remove the leading slash if present
    if (path.startsWith("/")) {
      path = path.slice(1);
    }
    return `${path}`;
  };
  const handleLocationSelect = (location: any, index: number) => {
    setValue(
      `StoreOpeningDaysAndLocation.${index}.fineLocation.lattitude`,
      location.lat
    );
    setValue(
      `StoreOpeningDaysAndLocation.${index}.fineLocation.longtiude`,
      location.lng
    );
    setValue(
      `StoreOpeningDaysAndLocation.${index}.fineLocation.city`,
      location.city
    );
    setValue(
      `StoreOpeningDaysAndLocation.${index}.fineLocation.state`,
      location.state
    );
    setValue(
      `StoreOpeningDaysAndLocation.${index}.fineLocation.street`,
      location.street
    );
    setValue(
      `StoreOpeningDaysAndLocation.${index}.fineLocation.zipCode`,
      location.zipCode
    );
  };
  const convertBooleanToNumber = (value: boolean): number => {
    return value ? 1 : 0;
  };
  const formatData = (data: any) => {
    // Removing fineLocations and shopOwner from the formatted data
    const { fineLocations, shopOwner, ...restData } = data;
    return {
      ...restData,
      storeLinks: data.storeLinks.map(
        (link: { link: string; linkType: number; storeLinkId: number }) => ({
          link: link.link,
          linkType: link.linkType,
          storeLinkId: link.storeLinkId || 0,
        })
      ),
      StoreOpeningDaysAndLocation: data.StoreOpeningDaysAndLocation.map(
        (location: {
          fineLocation: {
            fineLocationId?: number;
            address: string;
            longtiude: string;
            lattitude: string;
            city: string;
            phoneNumber: string;
            state: string;
            zipCode: string;
            street: string;
            email: string;
          };
          days: any[];
        }) => ({
          fineLocation: {
            fineLocationId: location.fineLocation.fineLocationId,
            address: location.fineLocation.address,
            longtiude: location.fineLocation.longtiude,
            lattitude: location.fineLocation.lattitude,
            city: location.fineLocation.city,
            phoneNumber: location.fineLocation.phoneNumber,
            state: location.fineLocation.state,
            zipCode: location.fineLocation.zipCode,
            street: location.fineLocation.street,
            email: location.fineLocation.email,
          },
          days: location.days.map(
            (day: {
              openTime: string;
              closeTime: string;
              dayId: number;
              id: number;
            }) => ({
              openTime: day.openTime,
              closeTime: day.closeTime,
              dayId: day.dayId,
              id: day.id,
            })
          ),
        })
      ),
      instagramPhotos: data.instagramPhotos.map(
        (photo: { li: string; instagramPhotosId: number }) => ({
          li: photo.li || "",
          instagramPhotosId: photo.instagramPhotosId || 0,
        })
      ),
      storeTags: data.storeTags.map((tag: { tagId: number }) => ({
        storeTagId: 0,
        storeId: 0,
        tagId: tag.tagId,
      })),
      storePicture: data.storePicture,
      storeId: data.storeId,
      learnWithUs: data.learnWithUs || "",
      meetUs: data.meetUs || "",
      classInfo: data.classInfo || "",
      createdAt: new Date(),
      updatedAt: new Date(),
      bazaarDetails: data.bazaarDetails || [],
      products: data.products || [],
      shopOwner2: data.shopOwner2 || { username: "", email: "" },
      hasClasses:
        convertBooleanToNumber(data.hasClasses as unknown as boolean) || 0,
      isClaimed:
        convertBooleanToNumber(data.isClaimed as unknown as boolean) || 0,
      isBazaar:
        convertBooleanToNumber(data.isBazaar as unknown as boolean) || 0,
    };
  };
  const onSubmit: SubmitHandler<StoreData> = async (formData: StoreData) => {
    const formattedData = formatData(formData);
    setLoading(true);

    try {
      if (id !== undefined) {
        await UpdateStore(formattedData, id);
        setSuccessMessage("Store updated successfully");

        setTimeout(() => {
          setSuccessMessage("");
        }, 4000);
        // Navigate to adminHome after 5 seconds
        // setTimeout(() => {
        //   navigate("/adminHome");
        // }, 5000);
      }
    } catch (error) {
      console.error("Error updated store:", error);
      setErrorMessage(`Error updated store:${error}`);

      setTimeout(() => {
        setErrorMessage(``);
      }, 4000);
    } finally {
      setLoading(false); // Hide loading spinner after submission is complete
    }
    // const jsonString = JSON.stringify(formattedData, null, 2);
    // const blob = new Blob([jsonString], { type: "application/json" });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement("a");
    // a.href = url;
    // a.download = "EditStoreData.json";
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
  };

  return (
    <>
      <AdminHeader />
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Container className="add-container">
          <h3>Update Store</h3>
          {formValues && (
            <form
              key={JSON.stringify(formValues)}
              onSubmit={handleSubmit(onSubmit)}
              className="add-form"
            >
              {/* Error Message */}
              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <span className="text-danger">{errorMessage}</span>
              )}
              {currentStep === 0 && (
                <>
                  {/* Store Info Section */}
                  {/* Static Fields */}
                  <Row>
                    <Col>
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
                          <span className="text-danger">
                            This field is required
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col>
                      <img
                        src={getPictureUrl(
                          formValues?.storePicture
                            .replace("http://", "https://")
                            .replace(
                              "api.westerlies.io",
                              "apibeta.westerlies.com"
                            )
                            .replace("/api/", "/images/")
                        )}
                        className="img-fluid"
                        alt="..."
                      />
                      <div className="mb-3">
                        <label className="form-label" htmlFor="storePicture">
                          Picture
                        </label>
                        <input
                          className="form-control"
                          id="storePicture"
                          type="file"
                          onChange={handleFileChange}
                        />
                        {errors.storePicture && (
                          <span className="text-danger">
                            This field is required
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="input-group">
                        <span className="input-group-text">Description</span>
                        <textarea
                          className="form-control"
                          id="description"
                          aria-label="description"
                          {...register("about")}
                          {...register("description", { required: true })}
                        />
                        {errors.description && (
                          <span className="text-danger">
                            This field is required
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="yelpReviewUrl">
                          Yelp Review Url
                        </label>
                        <input
                          className="form-control"
                          id="yelpReviewUrl"
                          {...register("googleReiviewUrl")}
                          {...register("yelpReviewUrl")}
                        />
                        {errors.yelpReviewUrl && (
                          <span className="text-danger">
                            This field is required
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label className="form-label" htmlFor="primaryTag">
                        Primary Tag
                      </label>
                      <select
                        className="form-select"
                        id="primaryTag"
                        {...register("primaryTag", {
                          required: true,
                        })}
                        defaultValue={formValues?.primaryTag}
                      >
                        {tags.map((tag) => (
                          <option key={tag.tagId} value={tag.tagId}>
                            {tag.tagName}
                          </option>
                        ))}
                      </select>
                      {errors.primaryTag && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </Col>
                    <Col className="check-box">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="hasClasses"
                          {...register("hasClasses")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="hasClasses"
                        >
                          Has Class
                        </label>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="input-group">
                        <span className="input-group-text">More Info</span>
                        <textarea
                          className="form-control"
                          id="moreInfo"
                          aria-label="moreInfo"
                          {...register("moreInfo")}
                        />
                        {errors.moreInfo && (
                          <span className="text-danger">
                            This field is required
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  {/* Dynamic Store Links */}
                  <div className="col">
                    <h5>Store Links</h5>
                    {storeLinkFields.map((field, index) => (
                      <div key={field.id}>
                        <Row>
                          <Col>
                            {" "}
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
                              defaultValue={field.linkType || ""}
                            >
                              {links.map((link) => (
                                <option
                                  key={link.linkTypeId}
                                  value={link.linkTypeId}
                                >
                                  {link.linkTypeName}
                                </option>
                              ))}
                            </select>
                            {errors.storeLinks?.[index]?.linkType && (
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </Col>
                          <Col>
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
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </Col>
                          <Col className="form-button">
                            <Button
                              type="button"
                              variant="danger"
                              onClick={() => removeStoreLink(index)}
                            >
                              Remove
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={() =>
                        appendStoreLink({
                          link: "",
                          linkType: links[0]?.linkTypeId || 1,
                          storeLinkId: 0,
                        })
                      }
                    >
                      Add Store Link
                    </Button>
                  </div>

                  {/* Dynamic Instagram Photos */}
                  <div className="mb-3">
                    <h5>Instagram Photos</h5>
                    {instagramPhotoFields.map((field, index) => (
                      <div key={field.id}>
                        <Row>
                          <Col>
                            <label
                              className="form-label"
                              htmlFor={`instagramPhotos.${index}.li`}
                            >
                              Photo URL
                            </label>
                            <input
                              className="form-control"
                              id={`instagramPhotos.${index}.li`}
                              {...register(`instagramPhotos.${index}.li`, {
                                required: true,
                              })}
                            />
                            {errors.instagramPhotos?.[index]?.li && (
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </Col>
                          <Col className="form-button">
                            <Button
                              variant="danger"
                              type="button"
                              onClick={() => removeInstagramPhoto(index)}
                            >
                              Remove
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={() =>
                        appendInstagramPhoto({ li: "", instagramPhotosId: 0 })
                      }
                    >
                      Add Instagram Photo
                    </Button>
                  </div>
                  {/* Dynamic Store Tags */}
                  <div className="mb-3">
                    <h5>Secondary Tags</h5>
                    <div className="alert alert-info" role="alert">
                      Please include both <strong>Product Tags</strong> and{" "}
                      <strong>Social Impact Tags</strong> that apply to this
                      store. These tags help categorize and highlight the
                      store's offerings and impact.
                    </div>
                    {storeTagFields.map((field, index) => (
                      <div key={field.id}>
                        <Row>
                          <Col className="hidden-inputs">
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
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </Col>
                          <Col className="hidden-inputs">
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
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </Col>
                          <Col>
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
                              defaultValue={field.tagId}
                            >
                              
                              <optgroup label="Product Tags">
    {tags
      .filter(tag => tag.tagTypeId === 1)
      .map(tag => (
        <option key={tag.tagId} value={tag.tagId}>
          {tag.tagName}
        </option>
      ))}
  </optgroup>
  <optgroup label="Social Tags">
    {tags
      .filter(tag => tag.tagTypeId === 2)
      .map(tag => (
        <option key={tag.tagId} value={tag.tagId}>
          {tag.tagName}
        </option>
      ))}
  </optgroup>
                            </select>
                            {errors.storeTags?.[index]?.tagId && (
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </Col>
                          <Col className="form-button">
                            <Button
                              variant="danger"
                              type="button"
                              onClick={() => removeStoreTag(index)}
                            >
                              Remove
                            </Button>
                          </Col>
                        </Row>
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
                  <div className="next-button">
                    <Col className="form-button">
                      <Button type="button" onClick={handleNext}>
                        Next
                      </Button>
                    </Col>
                  </div>
                </>
              )}
              {currentStep === 1 && (
                <>
                  {/* Store Address Section */}
                  {/* Dynamic Store Opening Days and Location */}
                  <div className="mb-3">
                    <Row>
                      <h4>Store Location and Opening days</h4>
                    </Row>

                    {storeOpeningDaysFields.map(
                      (storeOpeningDay, storeOpeningDayIndex) => (
                        <div key={storeOpeningDay.id}>
                          <h5 className="mt-3">
                            {" "}
                            Address:
                            {watch(
                              `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.street`
                            ) || "New Location"}
                          </h5>
                          <Row>
                            <Col>
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
                              {errors.StoreOpeningDaysAndLocation?.[
                                storeOpeningDayIndex
                              ]?.fineLocation?.longtiude && (
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
                              {errors.StoreOpeningDaysAndLocation?.[
                                storeOpeningDayIndex
                              ]?.fineLocation?.lattitude && (
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
                              {errors.StoreOpeningDaysAndLocation?.[
                                storeOpeningDayIndex
                              ]?.fineLocation?.city && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                              <label
                                className="form-label"
                                htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.state`}
                              >
                                State
                              </label>
                              <input
                                className="form-control"
                                id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.state`}
                                {...register(
                                  `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.state`,
                                  { required: true }
                                )}
                              />
                              {errors.StoreOpeningDaysAndLocation?.[
                                storeOpeningDayIndex
                              ]?.fineLocation?.state && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                              <label
                                className="form-label"
                                htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.street`}
                              >
                                Street
                              </label>
                              <input
                                className="form-control"
                                id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.street`}
                                {...register(
                                  `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.street`,
                                  { required: true }
                                )}
                              />
                              {errors.StoreOpeningDaysAndLocation?.[
                                storeOpeningDayIndex
                              ]?.fineLocation?.street && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                              <label
                                className="form-label"
                                htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.zipCode`}
                              >
                                Zip Code
                              </label>
                              <input
                                className="form-control"
                                id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.zipCode`}
                                {...register(
                                  `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.zipCode`,
                                  
                                )}
                              />
                              {errors.StoreOpeningDaysAndLocation?.[
                                storeOpeningDayIndex
                              ]?.fineLocation?.zipCode && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}

                              <label
                                className="form-label"
                                htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.phoneNumber`}
                              >
                                Phone Number
                              </label>
                              <input
                                className="form-control"
                                id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.phoneNumber`}
                                {...register(
                                  `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.fineLocation.phoneNumber`,
                                 
                                )}
                              />
                              {errors.StoreOpeningDaysAndLocation?.[
                                storeOpeningDayIndex
                              ]?.fineLocation?.phoneNumber && (
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
                                 
                                )}
                              />
                              {errors.StoreOpeningDaysAndLocation?.[
                                storeOpeningDayIndex
                              ]?.fineLocation?.email && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Col>
                            <Col>
                              <LocationPicker
                                initialLat={
                                  storeOpeningDay.fineLocation.lattitude
                                }
                                initialLng={
                                  storeOpeningDay.fineLocation.longtiude
                                }
                                onLocationSelect={(location) =>
                                  handleLocationSelect(
                                    location,
                                    storeOpeningDayIndex
                                  )
                                }
                              />
                            </Col>
                          </Row>

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
                          <Col className="address-button">
                            <Button
                              variant="danger"
                              type="button"
                              onClick={() =>
                                removeStoreOpeningDay(storeOpeningDayIndex)
                              }
                            >
                              Remove Store Location
                            </Button>
                          </Col>
                        </div>
                      )
                    )}

                    <Col className="address-button">
                      <Button
                        type="button"
                        onClick={() =>
                          appendStoreOpeningDay({
                            fineLocation: {
                              longtiude: "",
                              lattitude: "",
                              city: "",
                              phoneNumber: "",
                              state: "",
                              zipCode: "",
                              street: "",
                              email: "",
                            },
                            days: [
                              {
                                openTime: "",
                                closeTime: "",
                                dayId: days[0]?.dayId || 1,
                                id: 0,
                                storeId: formValues.storeId,
                              },
                            ],
                          })
                        }
                      >
                        Add Store Location
                      </Button>
                    </Col>
                  </div>
                  <Col className="save-button">
                    <div className="previous-button">
                      <Button
                        className="btn btn-secondary"
                        type="button"
                        onClick={handlePrevious}
                      >
                        Previous
                      </Button>
                    </div>
                    <div className="next-button">
                      <Button type="submit">Save</Button>
                    </div>
                  </Col>
                </>
              )}
            </form>
          )}
        </Container>
      )}
    </>
  );
};
const generateTimeOptions = () => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const period = i < 12 ? "AM" : "PM";
    times.push(`${hour}:00 ${period}`);
    times.push(`${hour}:30 ${period}`);
  }
  return times;
};

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

  const timeOptions = generateTimeOptions();

  return (
    <div className="col">
      {fields.map((field, index) => (
        <div key={field.id}>
          <Row>
            <Col>
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
              {errors.StoreOpeningDaysAndLocation?.[storeOpeningDayIndex]
                ?.days?.[index]?.dayId && (
                <span className="text-danger">This field is required</span>
              )}
            </Col>
            <Col>
              <label
                className="form-label"
                htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.openTime`}
              >
                Open Time
              </label>
              <select
                className="form-select"
                id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.openTime`}
                {...register(
                  `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.openTime`,
                  { required: true }
                )}
              >
                {timeOptions.map((time, idx) => (
                  <option key={idx} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.StoreOpeningDaysAndLocation?.[storeOpeningDayIndex]
                ?.days?.[index]?.openTime && (
                <span className="text-danger">This field is required</span>
              )}
            </Col>
            <Col>
              <label
                className="form-label"
                htmlFor={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.closeTime`}
              >
                Close Time
              </label>
              <select
                className="form-select"
                id={`StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.closeTime`}
                {...register(
                  `StoreOpeningDaysAndLocation.${storeOpeningDayIndex}.days.${index}.closeTime`,
                  { required: true }
                )}
              >
                {timeOptions.map((time, idx) => (
                  <option key={idx} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.StoreOpeningDaysAndLocation?.[storeOpeningDayIndex]
                ?.days?.[index]?.closeTime && (
                <span className="text-danger">This field is required</span>
              )}
            </Col>
            <Col className="form-button">
              <Button
                variant="danger"
                type="button"
                onClick={() => remove(index)}
              >
                Remove Day
              </Button>
            </Col>
          </Row>
        </div>
      ))}
      <Button
        type="button"
        onClick={() =>
          append({
            openTime: "",
            closeTime: "",
            dayId: days[0]?.dayId || 1,
            id: 0,
          })
        }
      >
        Add Day
      </Button>
    </div>
  );
};

export default Update;
