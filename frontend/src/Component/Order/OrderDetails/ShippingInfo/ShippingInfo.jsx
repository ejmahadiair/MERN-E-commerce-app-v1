import React, { useState } from "react";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import "./shippingInfo.scss";
import { saveShippingInfo } from "../../../../actions/cartAction";
const ShippingInfo = ({ setShippingDetails, setConfirmOrder }) => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.addToCart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [postCode, setPostCode] = useState(shippingInfo.postCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingInfoHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInfo({ address, city, postCode, phoneNo, country, state })
    );
    setShippingDetails({ select: false, active: true });
    setConfirmOrder({ select: true, active: true });
  };

  return (
    <>
      <div className="Shipping-info-container">
        <div className="shipping-info-tag">
          <h2>Shipping Details</h2>
          <div className="shipping-info-line"></div>
        </div>

        <form onSubmit={shippingInfoHandler}>
          <div className="info info-address">
            <HomeIcon className="info-icon" />
            <input
              type="text"
              value={address}
              required
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="info info-city">
            <LocationCityIcon className="info-icon" />
            <input
              type="text"
              value={city}
              required
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="info info-post-code">
            <PinDropIcon className="info-icon" />
            <input
              type="text"
              value={postCode}
              required
              placeholder="Post Code"
              onChange={(e) => setPostCode(e.target.value)}
            />
          </div>
          <div className="info info-phone">
            <PhoneIcon className="info-icon" />
            <input
              type="text"
              value={phoneNo}
              required
              placeholder="Phone Number with Country code"
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>
          <div className="info info-country">
            <PublicIcon className="info-icon" />
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="">Country</option>
              {Country &&
                Country.getAllCountries().map((x) => {
                  return (
                    <option key={x.isoCode} value={x.isoCode}>
                      {x.name}
                    </option>
                  );
                })}
            </select>
          </div>
          {country && (
            <div className="info info-state">
              <TransferWithinAStationIcon className="info-icon" />
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              >
                <option value="">States or Citys</option>
                {State &&
                  State.getStatesOfCountry(country).map((x) => {
                    return (
                      <option key={x.isoCode} value={x.isoCode}>
                        {x.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          )}
          <div className="info info-phone">
            <button type="submit" className="button-design-tomato">
              Continue
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShippingInfo;
