
export interface SignUp_Data{
    name: string,
    email: string,
    password: string,
    phone_no: string,
    address: string,
    role: string,
    d_license_no: string   
  }

  export interface VehicleData{
    v_type:string,
    vehicle_no:string,
    make:string,
    model:string,
    year:number,
    fuel_type:string,
    mileage:number,
    price_per_hrs:number,
    status:string
  }

  export interface Rental{
    total_bill:number,
    payment_mode:string
  }