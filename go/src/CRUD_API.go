package main

import (
	"fmt"

	"github.com/gin-contrib/cors" // Why do we need this package?
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
	_ "github.com/jinzhu/gorm/dialects/sqlite" // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB // declaring the db globally
var err error

type User struct {
	ID        uint   `json:"id"`
	Username  string `json:"username", gorm:"primary_key"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	Password  string `json:"password"`
}

type Quiz struct {
	ID    uint   `json:"id"`
	Name  string `json:"name"`
	Genre string `json:"genre"`
}

type Question struct {
	ID        uint   `json:"id"`
	Quiz_id   uint   `json:"quiz_id"`
	Q_No      uint   `json:"q_no"`
	Q         string `json:"q"`
	OptA      string `json:"opta"`
	OptB      string `json:"optb"`
	OptC      string `json:"optc"`
	OptD      string `json:"optd"`
	A_correct uint   `json:"a_correct", gorm:"default:0"`
	B_correct uint   `json:"b_correct", gorm:"default:0"`
	C_correct uint   `json:"c_correct", gorm:"default:0"`
	D_correct uint   `json:"d_correct", gorm:"default:0"`
	Img       string `json:"img"`
}

type History struct {
	ID      uint   `json:"id"`
	User_id string `json:"user_id"`
	Quiz_ID uint   `json:"quiz_id"`
	Score   uint   `json:"score"`
}

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()
	db.AutoMigrate(&User{})
	db.AutoMigrate(&Quiz{})
	db.AutoMigrate(&Question{})
	db.AutoMigrate(&History{})
	r := gin.Default()

	r.GET("/users", GetUsers) // Creating routes for each functionality
	r.GET("/valid/:username", Valid_Username)
	r.GET("/user/:username", GetUser)
	r.GET("/questions", question)
	r.POST("/create/user", CreateUser)
	r.POST("/create/quiz", CreateQuiz)
	r.GET("/quiz/:id", GetQuiz)
	r.POST("/create/question", CreateQuestion)
	r.GET("/quiz/:id/:no", GetQuestion)
	r.POST("/record", PostRecord)
	r.GET("/record", GetHistory)
	r.GET("/record/:id", GetUserHistory)
	r.GET("/questions/:id", GetQuestions)
	r.POST("/authenticate", Authenticate)
	r.GET("/quizes", GetQuizes)
	r.PUT("/edit/question/:id/:no", UpdateQuestion)
	r.PUT("/edit/user/:username", UpdateUser)
	r.PUT("/edit/quiz/:genre", UpdateQuiz)
	/*r.PUT("/people/:id", UpdatePerson)
	  r.DELETE("/people/:id", DeletePerson)*/
	r.GET("/verify/:id/:username", GetRecord)
	r.GET("/get/question/:id/:no", GetQues)
	r.GET("/get/quiz/:genre", GetByGenre)
	r.DELETE("/delete/records/:username", DeleteUserRecords)
	r.DELETE("/delete/user/:username", DeleteUser)
	r.DELETE("/delete/quiz/:id", DeleteQuiz)
	r.DELETE("/delete/record/:id", DeleteRecord)
	r.DELETE("/delete/question/:id/:no", DeleteQuestion)
	r.Use((cors.Default()))
	r.Run(":8080") // Run on port 8080
}

func DeleteRecord(c *gin.Context) {
	id := c.Params.ByName("id")
	var record []History
	d := db.Where("Quiz_id = ?", id).Delete(&record)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"Record" + id: "deleted"})
}

func DeleteQuestion(c *gin.Context) {
	id := c.Params.ByName("id")
	no := c.Params.ByName("no")
	var ques []Question
	d := db.Where("Quiz_id = ?", id).Where("Q_No = ?", no).Delete(&ques)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"Question" + id: "deleted"})
}

func DeleteQuiz(c *gin.Context) {
	id := c.Params.ByName("id")
	var quiz Quiz
	var ques []Question
	d := db.Where("ID = ?", id).Delete(&quiz)
	d = db.Where("Quiz_id = ?", id).Delete(&ques)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"Quiz #" + id: "deleted"})
}

func DeleteUserRecords(c *gin.Context) {
	username := c.Params.ByName("username")
	d := db.Where("User_id = ?", username).Delete(History{})
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"Done": username})
}

func DeleteUser(c *gin.Context) {
	username := c.Params.ByName("username")
	var user User
	d := db.Where("Username = ?", username).Delete(&user)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"username #" + username: "deleted"})
}
func UpdateUser(c *gin.Context) {
	var user User
	username := c.Params.ByName("username")
	if err := db.Where("username = ? ", username).Find(&user).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.BindJSON(&user)
	db.Save(&user)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, user)
}

func UpdateQuiz(c *gin.Context) {
	var quiz Quiz
	id := c.Params.ByName("genre")
	if err := db.Where("genre = ?", id).Find(&quiz).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.BindJSON(&quiz)
	db.Save(&quiz)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, quiz)
}

func UpdateQuestion(c *gin.Context) {
	var question Question
	id := c.Params.ByName("id")
	no := c.Params.ByName("no")
	if err := db.Where("quiz_id = ? And q_no = ?", id, no).Find(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.BindJSON(&question)
	db.Save(&question)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, question)
}

func GetQues(c *gin.Context) {
	id := c.Params.ByName("id")
	no := c.Params.ByName("no")
	var ques Question
	if err := db.Where("Quiz_id = ?", id).Where("Q_no = ?", no).Find(&ques).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, ques)
	}
}

func GetByGenre(c *gin.Context) {
	genre := c.Params.ByName("genre")
	var quiz []Quiz
	if err := db.Where("genre = ?", genre).Find(&quiz).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, quiz)
	}
}

func question(c *gin.Context) {
	var ques []Question
	if err := db.Find(&ques).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, ques)
	}
}
func GetQuizes(c *gin.Context) {
	var quiz []Quiz
	if err := db.Find(&quiz).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, quiz)
	}
}
func Authenticate(c *gin.Context) {
	var user User
	c.BindJSON(&user)
	username := user.Username
	var success User
	if err := db.Where("Username = ?", username).Find(&success).Error; err != nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, success)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		err := bcrypt.CompareHashAndPassword([]byte(success.Password), []byte(user.Password))
		if err != nil {
			var fail User
        	c.JSON(200, fail)
        	return
    	}
    	fmt.Println("Authenticated")
		c.JSON(200, success)
	}
}

func Valid_Username(c *gin.Context) {
	username := c.Params.ByName("username")
	var user User
	if err := db.Where("Username = ?", username).Find(&user).Error; err != nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, user)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, user)
	}
}

func GetQuestions(c *gin.Context) {
	id := c.Params.ByName("id")
	var ques []Question
	if err := db.Where("Quiz_id = ?", id).Find(&ques).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, ques)
	}
}

func PostRecord(c *gin.Context) {
	var history History
	c.BindJSON(&history)
	db.Create(&history)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, history)
}

func GetRecord(c *gin.Context) {
	username := c.Params.ByName("username")
	id := c.Params.ByName("id")
	record := History{ID: 0, User_id: "", Quiz_ID: 0, Score: 0}
	if err := db.Where("quiz_id = ?", id).Where("user_id = ?", username).Find(&record).Error; err != nil {
		c.Header("access-control-allow-origin", "*")
		//c.AbortWithStatus(404)
		//fmt.Println(err)
		c.JSON(200, record)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, record)
	}
}

func GetHistory(c *gin.Context) {
	var record []History
	if err := db.Find(&record).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, record)
	}
}

func GetUserHistory(c *gin.Context) {
	id := c.Params.ByName("id")
	var record []History
	if err := db.Where("User_id = ?", id).Find(&record).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, record)
	}
}

func CreateQuestion(c *gin.Context) {
	var question Question
	c.BindJSON(&question)
	db.Create(&question)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, question)
}

func CreateQuiz(c *gin.Context) {
	var quiz Quiz
	c.BindJSON(&quiz)
	db.Create(&quiz)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, quiz)
}

func GetQuestion(c *gin.Context) {
	id := c.Params.ByName("id")
	no := c.Params.ByName("no")
	var question Question
	if err := db.Where("Quiz_id = ?", id).Where("Q_No = ?", no).First(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, question)
	}
}

func GetQuiz(c *gin.Context) {
	id := c.Params.ByName("id")
	var quiz Quiz
	if err := db.Where("ID = ?", id).First(&quiz).Error; err != nil {
		//c.AbortWithStatus(404)
		//fmt.Println(err)
		c.Header("access-control-allow-origin", "*")
		c.JSON(404, quiz)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, quiz)
	}
}

func CreateUser(c *gin.Context) {
	var user User
	c.BindJSON(&user)
	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.MinCost)
	if err!=nil{
		///anlald
	}
	user1 := User{FirstName : user.FirstName, LastName: user.LastName, Password : string(hash), Username : user.Username}
	db.Create(&user1)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, user1)
}

func GetUser(c *gin.Context) {
	username := c.Params.ByName("username")
	var user User
	if err := db.Where("username = ?", username).First(&user).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, user)
	}
}

func GetUsers(c *gin.Context) {
	var user []User
	if err := db.Find(&user).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, user)
	}
}
