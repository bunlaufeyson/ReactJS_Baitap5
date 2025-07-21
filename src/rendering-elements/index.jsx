export default function RenderingElements() {
  let message = "Hello World";
  let username = "Nguyen";
  let age = 18;

  const news = () => {
    return (
      <div>
        <h1>Israel ném hơn 100 quả bom vào 'trái tim Tehran'</h1>
        <p>
          Israel tuyên bố đã tiến hành các cuộc không kích vào mục tiêu quân sự
          tại "trái tim Tehran", khi xung đột hai bên tiếp tục leo thang nghiêm
          trọng.
        </p>
      </div>
    );
  };

  return (
    <div>
      <h1>RenderingElements</h1>
      <div>{message}</div>
      <p>Username: {username}</p>
      <p>Age: {age}</p>
      {news()}
    </div>
  );
}
