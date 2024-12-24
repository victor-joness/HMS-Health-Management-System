export const mapUserToCamelCase = (user) => ({
    id: user.Id,
    name: user.Name,
    email: user.Email,
    password: user.PassWord,
    role: user.Role,
    img: user.Img,
    age: user.Age,
    phoneNumber: user.PhoneNumber,
    phoneEmergency: user.PhoneEmergency,
    creationDate: user.CreationDate,
    createdUser: user.CreatedUser,
    deletionDate: user.DeletionDate
});