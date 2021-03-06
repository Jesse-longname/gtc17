from server.server import db

class User(db.Model):
    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key=True)
    # employee_id = db.Column(db.Integer, unique=True, nullable=False)
    username = db.Column(db.String(128), unique=True, nullable=False)
    first_name = db.Column(db.Unicode(128), nullable=False)
    last_name = db.Column(db.Unicode(128), nullable=False)
    location = db.Column(db.String(256), default='Unknown')
    bio = db.Column(db.Unicode)
    image = db.Column(db.String)

    # Flask Login fields
    is_authenticated = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    is_anonymous = db.Column(db.Boolean, default=False)
    
    def get_id(self):
        return self.username

    @property
    def serialize(self):
        return {
            'id': self.id,
            # 'employee_id': self.employee_id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'location': self.location,
            'bio': self.bio,
            'image': self.image,
            'is_authenticated': self.is_authenticated,
            'is_active': self.is_active,
            'is_anonymous': self.is_anonymous
        }
    
    @property
    def get_editable(self):
        return ['location', 'bio', 'image']