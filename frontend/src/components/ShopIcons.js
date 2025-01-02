import React from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getCategory } from "../constants/categoryList";
import { selectExpense } from "../actions/expenseAction";

const ShopIcons = () => {
  const dispatch = useDispatch();

  const onIconClick = (e) => {
    let selectedItem = {};
    selectedItem.selectedIcon = e.target.getAttribute("iconkey");
    selectedItem.selectedCategory = getCategory(
      e.target.getAttribute("iconkey")
    );
    dispatch(selectExpense(selectedItem));
  };
  return (
    <>
      <Row className="icon-row mt-4 mt-md-5">
        <Col xs={4} sm={3} md={2} className="icon-col mb-4 mb-md-0">
          <div
            className="icon-image-div amazon"
            iconkey="Amazon"
            onClick={onIconClick}
          ></div>
        </Col>
        <Col xs={4} sm={3} md={2} className="icon-col mb-4 mb-md-0">
          <div
            className="icon-image-div zepto"
            iconkey="Zepto"
            onClick={onIconClick}
          ></div>
        </Col>
        <Col xs={4} sm={3} md={2} className="icon-col mb-4 mb-md-0">
          <div
            className="icon-image-div nilgiris"
            iconkey="Nilgiris"
            onClick={onIconClick}
          ></div>
        </Col>
        <Col xs={4} sm={3} md={2} className="icon-col mb-4 mb-md-0">
          <div
            className="icon-image-div levis"
            iconkey="Levis"
            onClick={onIconClick}
          ></div>
        </Col>
        <Col xs={4} sm={3} md={2} className="icon-col mb-4 mb-md-0">
          <div
            className="icon-image-div cricket"
            iconkey="Cricket"
            onClick={onIconClick}
          ></div>
        </Col>
      </Row>
      <Row className="icon-row mt-0 mt-md-4">
        <Col xs={4} sm={3} md={2} className="icon-col mb-4 mb-md-0">
          <div
            className="icon-image-div suica"
            iconkey="Suica"
            onClick={onIconClick}
          ></div>
        </Col>
        <Col xs={4} sm={3} md={2} className="icon-col mb-4 mb-md-0">
          <div
            className="icon-image-div vegi"
            iconkey="Vegitables"
            onClick={onIconClick}
          ></div>
        </Col>
        <Col xs={4} sm={3} md={2} className="icon-col mb-4 mb-md-0">
          <div
            className="icon-image-div food"
            iconkey="Ordered Food"
            onClick={onIconClick}
          ></div>
        </Col>
        <Col xs={4} sm={3} md={2} className="icon-col mb-4 mb-md-0">
          <div
            className="icon-image-div toys"
            iconkey="Baby Toys"
            onClick={onIconClick}
          ></div>
        </Col>
      </Row>
    </>
  );
};

export default ShopIcons;
