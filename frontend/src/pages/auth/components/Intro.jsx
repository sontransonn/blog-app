import React from 'react'

const Intro = () => {
    return (
        <div className='w-1/3 hidden md:flex flex-col justify-between'>
            <div>
                <h2 className="text-4xl font-bold mb-8 text-white">
                    Chào mừng đến với cộng đồng của chúng tôi
                </h2>
                <p className="text-black font-bold">
                    Khám phá những bài viết chất lượng, mang đến cho bạn những góc nhìn sâu sắc và những câu chuyện đáng suy ngẫm.
                    Đăng ký ngay để không bỏ lỡ những thông tin bổ ích và truy cập nhanh chóng vào những nội dung hấp dẫn nhất
                </p>
            </div>
            <p className="text-slate-900">
                Liên hệ hỗ trợ: sontransonn@gmail.com | Điện thoại: +84 0866509926
            </p>
        </div>
    )
}

export default Intro