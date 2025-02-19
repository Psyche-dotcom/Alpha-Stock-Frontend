"use client";

import { useState } from "react";

const Terms: React.FC = () => {
  const [currentTab, activeTab] = useState<string>("privacy-policy");
  const list = [
    {
      id: 1,
      title: "Privacy Policy",
      value: "privacy-policy",
    },
    {
      id: 2,
      title: "Privacy Terms",
      value: "privacy-terms",
    },
    {
      id: 3,
      title: "Other terms of use",
      value: "privacy-terms",
    },
  ];
  return (
    <div className="gap-4 flex mt-8">
      <div className="w-[21.875rem]">
        <div className=" bg-white rounded-[12px] flex flex-col gap-2.5 p-[1rem] pb-[3.25rem]">
          {list.map((_, index) => (
            <h6
              key={index}
              className={`${
                currentTab === _.value
                  ? "font-semibold text-[#111928]"
                  : "underline text-[#6B7280]"
              } text-base cursor-pointer`}
            >
              {_.title}
            </h6>
          ))}
        </div>
      </div>
      <div className="p-[2rem] text-[#111928] bg-white rounded-[1.25rem] flex-1">
        <h5 className="font-semibold text-[2.25rem] mb-[2rem]">
          Privacy Policy
        </h5>
        <p className="font-medium text-base mb-[2rem]">
          Lorem ipsum dolor sit amet. Ut ratione fugit et alias fugiat est
          similique reprehenderit non nisi repellat ut voluptatibus officia et
          nemo dolore aut dolorum necessitatibus. Non dolor dolores vel esse
          deserunt et deleniti quis aut fugiat laboriosam cum omnis quisquam ea
          harum porro nam iste nemo. Ut modi voluptatem qui nostrum aliquid est
          quos vitae et deleniti modi qui Quis Quis. Eos nulla commodi non
          corporis labore quo accusamus voluptatibus ab molestias deleniti At
          nostrum unde a tempora facere sit eius itaque. Ut quas maiores sit
          quos voluptatibus ut consequatur modi. Est reprehenderit sint sit
          accusamus perferendis qui ratione dolorum et voluptates ducimus et
          autem similique eum excepturi dolor et harum pariatur? Eos tenetur
          laborum qui quia obcaecati 33 tempora magni. At optio quos sit autem
          earum eos doloribus accusamus.
        </p>
        <h6 className="font-bold text-2xl mb-2">
          Lorem ipsum dolor sit amet. Ut ratione fugit et alias
        </h6>
        <p className="font-medium text-base mb-[2rem]">
          Lorem ipsum dolor sit amet. Ut ratione fugit et alias fugiat est
          similique reprehenderit non nisi repellat ut voluptatibus officia et
          nemo dolore aut dolorum necessitatibus. Non dolor dolores vel esse
          deserunt et deleniti quis aut fugiat laboriosam cum omnis quisquam ea
          harum porro nam iste nemo. Ut modi voluptatem qui nostrum aliquid est
          quos vitae et deleniti modi qui Quis Quis. Eos nulla commodi non
          corporis labore quo accusamus voluptatibus ab molestias deleniti At
          nostrum unde a tempora facere sit eius itaque. Ut quas maiores sit
          quos voluptatibus ut consequatur modi. Est reprehenderit sint sit
          accusamus perferendis qui ratione dolorum et voluptates ducimus et
          autem similique eum excepturi dolor et harum pariatur? Eos tenetur
          laborum qui quia obcaecati 33 tempora magni. At optio quos sit autem
          earum eos doloribus accusamus.
        </p>
        <p className="font-medium text-base mb-[2rem]">
          Lorem ipsum dolor sit amet. Ut ratione fugit et alias fugiat est
          similique reprehenderit non nisi repellat ut voluptatibus officia et
          nemo dolore aut dolorum necessitatibus. Non dolor dolores vel esse
          deserunt et deleniti quis aut fugiat laboriosam cum omnis quisquam ea
          harum porro nam iste nemo. Ut modi voluptatem qui nostrum aliquid est
          quos vitae et deleniti modi qui Quis Quis. Eos nulla commodi non
          corporis labore quo accusamus voluptatibus ab molestias deleniti At
          nostrum unde a tempora facere sit eius itaque. Ut quas maiores sit
          quos voluptatibus ut consequatur modi. Est reprehenderit sint sit
          accusamus perferendis qui ratione dolorum et voluptates ducimus et
          autem similique eum excepturi dolor et harum pariatur? Eos tenetur
          laborum qui quia obcaecati 33 tempora magni. At optio quos sit autem
          earum eos doloribus accusamus.
        </p>
        <h6 className="font-bold text-2xl mb-2">
          Lorem ipsum dolor sit amet. Ut ratione fugit et alias
        </h6>
        <p className="font-medium text-base mb-[2rem]">
          Lorem ipsum dolor sit amet. Ut ratione fugit et alias fugiat est
          similique reprehenderit non nisi repellat ut voluptatibus officia et
          nemo dolore aut dolorum necessitatibus. Non dolor dolores vel esse
          deserunt et deleniti quis aut fugiat laboriosam cum omnis quisquam ea
          harum porro nam iste nemo. Ut modi voluptatem qui nostrum aliquid est
          quos vitae et deleniti modi qui Quis Quis. Eos nulla commodi non
          corporis labore quo accusamus voluptatibus ab molestias deleniti At
          nostrum unde a tempora facere sit eius itaque. Ut quas maiores sit
          quos voluptatibus ut consequatur modi. Est reprehenderit sint sit
          accusamus perferendis qui ratione dolorum et voluptates ducimus et
          autem similique eum excepturi dolor et harum pariatur? Eos tenetur
          laborum qui quia obcaecati 33 tempora magni. At optio quos sit autem
          earum eos doloribus accusamus.
        </p>
        <p className="font-medium text-base mb-[2rem]">
          Lorem ipsum dolor sit amet. Ut ratione fugit et alias fugiat est
          similique reprehenderit non nisi repellat ut voluptatibus officia et
          nemo dolore aut dolorum necessitatibus. Non dolor dolores vel esse
          deserunt et deleniti quis aut fugiat laboriosam cum omnis quisquam ea
          harum porro nam iste nemo. Ut modi voluptatem qui nostrum aliquid est
          quos vitae et deleniti modi qui Quis Quis. Eos nulla commodi non
          corporis labore quo accusamus voluptatibus ab molestias deleniti At
          nostrum unde a tempora facere sit eius itaque. Ut quas maiores sit
          quos voluptatibus ut consequatur modi. Est reprehenderit sint sit
          accusamus perferendis qui ratione dolorum et voluptates ducimus et
          autem similique eum excepturi dolor et harum pariatur? Eos tenetur
          laborum qui quia obcaecati 33 tempora magni. At optio quos sit autem
          earum eos doloribus accusamus.
        </p>
      </div>
    </div>
  );
};

export default Terms;
