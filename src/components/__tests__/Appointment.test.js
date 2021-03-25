import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointments/Index";

afterEach(cleanup);

describe("Appointment", () => {
    it("renders without crashing", () => {
      render(<Appointment />);
    });  
  });
