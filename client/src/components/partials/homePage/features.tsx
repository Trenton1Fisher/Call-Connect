export default function Features() {
  return (
    <div className="px-4 sm:px-10">
      <div className="mt-32 max-w-7xl mx-auto">
        <div className="mb-16 max-w-2xl text-center mx-auto">
          <h2 className="md:text-4xl text-3xl font-extrabold mb-6">
            Our Features
          </h2>
          <p className="mt-6">
            Our app provides a seamless way to get help when you need it.
            Whether you're facing a technical issue, need advice, or want to
            collaborate on a project, you can easily fill out a ticket
            describing your problem. If someone is available to assist, they can
            join you in a video call or opt for messaging. Our platform ensures
            that you get the support you need in the way that works best for
            you.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 max-md:max-w-lg mx-auto gap-8">
          {/* First item */}
          <div className="sm:p-6 p-4 flex bg-white rounded-md light:border dark:bg-[#2b2b2b] shadow-[0_14px_40px_-11px_rgba(93,96,127,0.2)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-12 h-12 mr-6 p-3 rounded-md shrink-0 bg-blue-50 dark:bg-[#3b3b3b]"
              viewBox="0 0 32 32"
            >
              <path
                d="M28.068 12h-.128a.934.934 0 0 1-.864-.6.924.924 0 0 1 .2-1.01l.091-.091a2.938 2.938 0 0 0 0-4.147l-1.511-1.51a2.935 2.935 0 0 0-4.146 0l-.091.091A.956.956 0 0 1 20 4.061v-.129A2.935 2.935 0 0 0 17.068 1h-2.136A2.935 2.935 0 0 0 12 3.932v.129a.956.956 0 0 1-1.614.668l-.086-.091a2.935 2.935 0 0 0-4.146 0l-1.516 1.51a2.938 2.938 0 0 0 0 4.147l.091.091a.935.935 0 0 1 .185 1.035.924.924 0 0 1-.854.579h-.128A2.935 2.935 0 0 0 1 14.932v2.136A2.935 2.935 0 0 0 3.932 20h.128a.934.934 0 0 1 .864.6.924.924 0 0 1-.2 1.01l-.091.091a2.938 2.938 0 0 0 0 4.147l1.51 1.509a2.934 2.934 0 0 0 4.147 0l.091-.091a.936.936 0 0 1 1.035-.185.922.922 0 0 1 .579.853v.129A2.935 2.935 0 0 0 14.932 31h2.136A2.935 2.935 0 0 0 20 28.068v-.129a.956.956 0 0 1 1.614-.668l.091.091a2.935 2.935 0 0 0 4.146 0l1.511-1.509a2.938 2.938 0 0 0 0-4.147l-.091-.091a.935.935 0 0 1-.185-1.035.924.924 0 0 1 .854-.58h.128A2.935 2.935 0 0 0 31 17.068v-2.136A2.935 2.935 0 0 0 28.068 12Z"
                data-original="#000000"
              />
              <path
                d="M16 9a7 7 0 1 0 7 7 7.008 7.008 0 0 0-7-7Zm0 12a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5Z"
                data-original="#000000"
              />
            </svg>
            <div>
              <h3 className="text-xl font-semibold mb-2">Customization</h3>
              <p>
                Tailor our product to suit your needs, with options to
                personalize your support requests and preferences.
              </p>
            </div>
          </div>

          {/* Second item */}
          <div className="sm:p-6 p-4 flex bg-white rounded-md light:border dark:bg-[#2b2b2b]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-12 h-12 mr-6 p-3 rounded-md shrink-0 bg-blue-50 dark:bg-[#3b3b3b]"
              viewBox="0 0 682.667 682.667"
            >
              <defs>
                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                  <path d="M0 512h512V0H0Z" data-original="#000000" />
                </clipPath>
              </defs>
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="40"
                clipPath="url(#a)"
                transform="matrix(1.33 0 0 -1.33 0 682.667)"
              >
                <path d="M256 492 60 410.623v-98.925C60 183.674 137.469 68.38 256 20c118.53 48.38 196 163.674 196 291.698v98.925z" />
                <path d="M178 271.894 233.894 216 334 316.105" />
              </g>
            </svg>
            <div>
              <h3 className="text-xl font-semibold mb-2">Security</h3>
              <p>
                We prioritize your privacy and security, implementing the latest
                industry standards to keep your data safe.
              </p>
            </div>
          </div>

          {/* Third item */}
          <div className="sm:p-6 p-4 flex bg-white dark:bg-[#2b2b2b] rounded-md light:border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-12 h-12 mr-6 p-3 rounded-md shrink-0 bg-blue-50 dark:bg-[#3b3b3b]"
              viewBox="0 0 1024 1024"
            >
              <path d="M512 128c212.08 0 384 171.92 384 384S724.08 896 512 896 128 724.08 128 512s171.92-384 384-384m0-64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z" />
              <path d="M461.2 636.1 352 518.9l45.3-45.3 64.3 64.3L627 376.7l45.3 45.3L461.2 636.1z" />
            </svg>
            <div>
              <h3 className="text-xl font-semibold mb-2">Efficiency</h3>
              <p>
                Our system is designed to connect you with the right help,
                ensuring quick and effective problem resolution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
