import React, { useEffect, useState } from 'react';
import { useCartContext } from '../../data/cart_context';
import { useGlobalContext } from '../../data/context';
import { useUserContext } from '../../data/user_context';
import { formatPrice } from '../../data/utils/helpers';
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import { countries } from './countries';

export default function CheakoutPage() {
  const { cart, total_amount, addCustomerData, customerDetails } = useCartContext();
  const { country, nairavalue } = useGlobalContext();
  const { loginWithRedirect, myUser, logout } = useUserContext();
  const [selectedCountry, setSelectedCountry] = useState('Nigeria');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const changeText = (event) => {
    setFirstName(event.target.value);
  };

  const formFilled = customerDetails || (firstName.length > 0 && lastName.length > 0 && email.length > 0 && phone.length > 0 && address.length > 0 && selectedCountry.length > 0);

  const customerData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    address: address,
    selectedCountry: selectedCountry
  }

  const customerDataProcess = () => {
    console.log("from checkoutpage", customerData);
    addCustomerData(customerData);
  }


  useEffect(() => {

  }, [formFilled])
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
        <div className="w-full mb-5">
          <PageTitle
            title="Checkout"
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "checkout", path: "/checkout" },
            ]}
          />
        </div>
        <div className="checkout-main-content w-full">
          <div className="container-x mx-auto">
            <div className="w-full sm:mb-10 mb-5">
              <div className="sm:flex sm:space-x-[18px] s">
                <div className="sm:w-1/2 w-full mb-5 h-[70px]">
                  <a href="#">
                    <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                      {myUser ? <span className="text-[15px] font-medium cursor-pointer" onClick={() => logout({ returnTo: window.location.origin })}>
                        Logout
                      </span> : <span onClick={loginWithRedirect}>Login to your account</span>}

                    </div>
                  </a>
                </div>
                {/* <div className="flex-1 h-[70px]">
                  <a href="#">
                    <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                      <span className="text-[15px] font-medium">
                        Enter Coupon Code
                      </span>
                    </div>
                  </a>
                </div> */}
              </div>
            </div>
            <div className="w-full lg:flex lg:space-x-[30px]">
              <div className="lg:w-1/2 w-full">
                <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                  Shipping Details
                </h1>
                <div className="form-area">
                  <form>
                    <div className="sm:flex sm:space-x-5 items-center mb-6">
                      <div className="sm:w-1/2  mb-5 sm:mb-0">

                        <label
                          className="input-label capitalize block  text-qgray text-[13px] font-normal"
                          htmlFor={name}
                        > First Name
                        </label>
                        <div className='input-wrapper border border-qgray-border w-full h-full overflow-hidden relative'>
                          <input
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none w-full h-[50px]"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <label
                          className="input-label capitalize block  text-qgray text-[13px] font-normal"
                          htmlFor={name}
                        > Last Name
                        </label>
                        <div className='input-wrapper border border-qgray-border w-full h-full overflow-hidden relative'>
                          <input
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none w-full h-[50px]"
                          />
                        </div>
                        {/* <InputCom
                          label="Last Name*"
                          placeholder="Last Name"
                          inputClasses="w-full h-[50px]"
                        /> */}
                      </div>
                    </div>
                    <div className="flex space-x-5 items-center mb-6">
                      <div className="w-1/2">
                        <label
                          className="input-label capitalize block  text-qgray text-[13px] font-normal"
                          htmlFor={name}
                        > Email Address
                        </label>
                        <div className='input-wrapper border border-qgray-border w-full h-full overflow-hidden relative'>
                          <input
                            placeholder="Last Name"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none w-full h-[50px]"
                          />
                        </div>
                        {/* <InputCom
                          label="Email Address*"
                          inputClasses="w-full h-[50px]"
                          type='email'
                        /> */}
                      </div>
                      <div className="flex-1">
                        <label
                          className="input-label capitalize block  text-qgray text-[13px] font-normal"
                          htmlFor={name}
                        > Phone Number
                        </label>
                        <div className='input-wrapper border border-qgray-border w-full h-full overflow-hidden relative'>
                          <input
                            placeholder="Last Name"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none w-full h-[50px]"
                          />
                        </div>
                        {/* <InputCom
                          label="Phone Number*"
                          inputClasses="w-full h-[50px]"
                        /> */}
                      </div>
                    </div>
                    <div className="mb-6">
                      <h1 className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                        Country*
                      </h1>




                      <select id="country" value={selectedCountry} onChange={handleCountryChange} className="w-full h-[50px] border border-[#EDEDED] px-5 flex justify-between items-center mb-2">
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>

                    </div>
                    <div className=" mb-6">
                      <div className="w-full">
                        <label
                          className="input-label capitalize block  text-qgray text-[13px] font-normal"
                          htmlFor={name}
                        > Full Address
                        </label>
                        <div className='input-wrapper border border-qgray-border w-full h-full overflow-hidden relative'>
                          <input
                            placeholder="Last Name"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none w-full h-[50px]"
                          />
                        </div>
                        {/* <InputCom
                          label="Address*"
                          placeholder="Full Address"
                          inputClasses="w-full h-[50px]"
                        /> */}
                      </div>
                    </div>
                    {/* <div className="flex space-x-5 items-center mb-6">
                      <div className="w-1/2">
                        <h1 className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                          Town / City*
                        </h1>
                        <div className="w-full h-[50px] border border-[#EDEDED] px-5 flex justify-between items-center">
                          <span className="text-[13px] text-qgraytwo">
                            Town
                          </span>
                          <span>
                            <svg
                              width="11"
                              height="7"
                              viewBox="0 0 11 7"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z"
                                fill="#222222"
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <InputCom
                          label="Postcode / ZIP*"
                          placeholder=""
                          inputClasses="w-full h-[50px]"
                        />
                      </div>
                    </div> */}
                    {/* <div className="flex space-x-2 items-center mb-10">
                      <div>
                        <input type="checkbox" name="" id="create" />
                      </div>
                      <label
                        htmlFor="create"
                        className="text-qblack text-[15px] select-none"
                      >
                        Create an account?
                      </label>
                    </div> */}
                    {/* <div>
                      <h1 className="text-2xl text-qblack font-medium mb-3">
                        Billing Details
                      </h1>
                      <div className="flex space-x-2 items-center mb-10">
                        <div>
                          <input type="checkbox" name="" id="address" />
                        </div>
                        <label
                          htmlFor="address"
                          className="text-qblack text-[15px] select-none"
                        >
                          Ship to a different address
                        </label>
                      </div>
                    </div> */}

                    <span style={{ cursor: "pointer" }} onClick={() => addCustomerData(customerData)}>Change Address</span>
                    {customerDetails ? (<div style={{ marginTop: 30, width: "90%" }}>
                      <span style={{ fontStyle: "italic" }}>Current Shipping Details</span>
                      <p style={{ fontSize: 12 }}>{customerDetails ? customerDetails.address : null}</p>
                    </div>) : null}
                  </form>
                </div>
              </div>
              <div className="flex-1">
                <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                  Order Summary
                </h1>

                <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
                  <div className="sub-total mb-6">
                    <div className=" flex justify-between mb-5">
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        PROduct
                      </p>
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        total
                      </p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                  </div>
                  <div className="product-list w-full mb-[30px]">
                    <ul className="flex flex-col space-y-5">
                      {cart.map((item) => {
                        return <li key={item.id}>
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-[15px] text-qblack mb-2.5">
                                {item.title}
                                <sup className="text-[13px] text-qgray ml-2 mt-2">
                                  x{item.amount}
                                </sup>
                              </h4>
                              {/* <p className="text-[13px] text-qgray">
                                64GB, Black, 44mm, Chain Belt
                              </p> */}
                            </div>
                            <div>
                              <span className="text-[15px] text-qblack font-medium">
                                {country === "Nigeria" ? formatPrice((item.price * item.amount * nairavalue).toFixed(2)) : formatPrice((item.price * item.amount).toFixed(2))}
                              </span>
                            </div>
                          </div>
                        </li>
                      })}
                      {/* <li>
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-[15px] text-qblack mb-2.5">
                              Apple Watch
                              <sup className="text-[13px] text-qgray ml-2 mt-2">
                                x1
                              </sup>
                            </h4>
                            <p className="text-[13px] text-qgray">
                              64GB, Black, 44mm, Chain Belt
                            </p>
                          </div>
                          <div>
                            <span className="text-[15px] text-qblack font-medium">
                              $38
                            </span>
                          </div>
                        </div>
                      </li> */}
                      {/* <li>
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-[15px] text-qblack mb-2.5">
                              Apple Watch
                              <sup className="text-[13px] text-qgray ml-2 mt-2">
                                x1
                              </sup>
                            </h4>
                            <p className="text-[13px] text-qgray">
                              64GB, Black, 44mm, Chain Belt
                            </p>
                          </div>
                          <div>
                            <span className="text-[15px] text-qblack font-medium">
                              $38
                            </span>
                          </div>
                        </div>
                      </li> */}
                      {/* <li>
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-[15px] text-qblack mb-2.5">
                              Apple Watch
                              <sup className="text-[13px] text-qgray ml-2 mt-2">
                                x1
                              </sup>
                            </h4>
                            <p className="text-[13px] text-qgray">
                              64GB, Black, 44mm, Chain Belt
                            </p>
                          </div>
                          <div>
                            <span className="text-[15px] text-qblack font-medium">
                              $38
                            </span>
                          </div>
                        </div>
                      </li> */}
                    </ul>
                  </div>
                  <div className="w-full h-[1px] bg-[#EDEDED]"></div>

                  <div className="mt-[30px]">
                    <div className=" flex justify-between mb-5">
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        SUBTOTAL
                      </p>
                      <p className="text-[15px] font-medium text-qblack uppercase">
                        {country === "Nigeria" ? formatPrice((total_amount * nairavalue).toFixed(2)) : formatPrice((total_amount).toFixed(2))}
                      </p>
                    </div>
                  </div>

                  <div className="w-full mt-[30px]">
                    <div className="sub-total mb-6">
                      <div className=" flex justify-between mb-5">
                        <div>
                          <span className="text-xs text-qgraytwo mb-3 block">
                            SHIPPING
                          </span>
                          <p className="text-base font-medium text-qblack">
                            Free Shipping
                          </p>
                        </div>
                        <p className="text-[15px] font-medium text-qblack">
                          +0
                        </p>
                      </div>
                      <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                    </div>
                  </div>

                  <div className="mt-[30px]">
                    <div className=" flex justify-between mb-5">
                      <p className="text-2xl font-medium text-qblack">Total</p>
                      <p className="text-2xl font-medium text-qred">{country === "Nigeria" ? formatPrice((total_amount * nairavalue).toFixed(2)) : formatPrice((total_amount).toFixed(2))}</p>
                    </div>
                  </div>
                  {/* <div className="shipping mt-[30px]">
                    <ul className="flex flex-col space-y-1">
                      <li className=" mb-5">
                        <div className="flex space-x-2.5 items-center mb-4">
                          <div className="input-radio">
                            <input
                              type="radio"
                              name="price"
                              className="accent-pink-500"
                              id="transfer"
                            />
                          </div>
                          <label
                            htmlFor="transfer"
                            className="text-[18px] text-normal text-qblack"
                          >
                            Direct Bank Transfer
                          </label>
                        </div>
                        <p className="text-qgraytwo text-[15px] ml-6">
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
                        </p>
                      </li>
                      <li>
                        <div className="flex space-x-2.5 items-center mb-5">
                          <div className="input-radio">
                            <input
                              type="radio"
                              name="price"
                              className="accent-pink-500"
                              id="delivery"
                            />
                          </div>
                          <label
                            htmlFor="delivery"
                            className="text-[18px] text-normal text-qblack"
                          >
                            Cash on Delivery
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="flex space-x-2.5 items-center mb-5">
                          <div className="input-radio">
                            <input
                              type="radio"
                              name="price"
                              className="accent-pink-500"
                              id="bank"
                            />
                          </div>
                          <label
                            htmlFor="bank"
                            className="text-[18px] text-normal text-qblack"
                          >
                            Credit/Debit Cards or Paypal
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div> */}

                  <div className="w-full h-[50px] black-btn flex justify-center items-center">
                    {/* {myUser ?  */}
                    <a href={formFilled ? `/checkoutpayment` : null}><span className="text-sm font-semibold cursor-pointer">
                      Place Order Now
                    </span></a>
                    {/* <span className="cursor-pointer" onClick={loginWithRedirect}>Login to checkout</span>} */}
                  </div>
                  {!formFilled && <span className='flex justify-center items-center'>Complete the form to proceed</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
