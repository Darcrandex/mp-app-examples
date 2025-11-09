import './styles.css'

export default function CouponItem() {
  return (
    <div className='milk-tea_coupon-item flex overflow-hidden'>
      <span className='milk-tea_coupon-item_text text-gray-800'>12</span>
      <i className='milk-tea_coupon-item_line'></i>
      <span className='milk-tea_coupon-item_text text-gray-800'>领取</span>
    </div>
  )
}
