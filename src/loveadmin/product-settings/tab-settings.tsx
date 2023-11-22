import { Form, Input } from "antd";
import classNames from "classnames";

const TabSettings = () => {
  const [productDetailsForm] = Form.useForm();

  const navigation = [
    { name: "Forms", href: "#", current: true },
    { name: "Consents", href: "#", current: false },
    { name: "Emergency contacts", href: "#", current: false },
    { name: "Required files", href: "#", current: false },
    { name: "Product fields", href: "#", current: false },
    { name: "Product relationships", href: "#", current: false },
  ];

  return (
    <div className="flex gap-10">
      <nav className="w-56 shrink-0">
        <ul role="list" className="space-y-0.5">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-neutral-100/75 text-neutral-900 font-medium"
                    : "text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50",
                  "flex gap-x-3 rounded-md p-2 px-3.5 hover:no-underline"
                )}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex-grow max-w-xl mx-auto mt-1">
        <Form
          form={productDetailsForm}
          name="productDetailsForm"
          className="hide-validation-asterix"
        >
          <Form.Item
            label="Name of product"
            name="nameOfProduct"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Number of coaches" name="numberOfCoaches">
            <Input />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default TabSettings;
